import mimetypes
from flask import Flask, render_template, request, redirect, session, jsonify, send_from_directory, abort
from functools import wraps
import os
import shutil
import datetime
from datetime import timedelta
import argparse
import secrets
import logging
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
from hotspot_keeper import start_hotspot_keeper, ensure_hotspot_on, wait_for_host_ip



load_dotenv()

# Default configurations
DEFAULT_BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "shared")
DEFAULT_HOST = "192.168.137.1"
DEFAULT_PORT = 8000
DEFAULT_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
DEFAULT_PASSWORD = os.getenv("ADMIN_PASSWORD", "1234")

# Set up CLI parser
parser = argparse.ArgumentParser(description="LocalXS - Local Cross-Platform Sharing Server")
parser.add_argument("--dir", default=DEFAULT_BASE_DIR, help="Base directory for files")
parser.add_argument("--host", default=DEFAULT_HOST, help="Server host")
parser.add_argument("--port", type=int, default=DEFAULT_PORT, help="Server port")
parser.add_argument("--user", default=DEFAULT_USERNAME, help="Username for authentication")
parser.add_argument("--pwd", default=DEFAULT_PASSWORD, help="Password for authentication")
parser.add_argument("--ssl", choices=['none', 'adhoc'], default='adhoc',
                    help="SSL mode: 'adhoc' (self-signed HTTPS, default) or 'none' (plain HTTP, insecure)")
args, unknown = parser.parse_known_args()

BASE_DIR = os.path.abspath(args.dir)
HOST = args.host
PORT = args.port
USERNAME = args.user
PASSWORD_HASH = generate_password_hash(args.pwd)
SSL_MODE = args.ssl

app = Flask(__name__, template_folder='templates', static_folder='static')

# Generate a new random secret key on every server restart for security
app.secret_key = os.urandom(24)

# Configure Flask session cookie security
app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE='Strict',
    SESSION_COOKIE_SECURE=(SSL_MODE == 'adhoc'),
    PERMANENT_SESSION_LIFETIME=timedelta(hours=8)
)

if SSL_MODE == 'adhoc':
    app.config['SESSION_COOKIE_NAME'] = '__Host-session'

# Ensure BASE_DIR exists
if not os.path.exists(BASE_DIR):
    try:
        os.makedirs(BASE_DIR, exist_ok=True)
    except Exception as e:
        print(f"Warning: Could not create base directory {BASE_DIR}: {e}")

# -------- AUDIT LOGGING --------
audit_logger = logging.getLogger('audit')
audit_handler = logging.FileHandler('server_audit.log')
audit_handler.setFormatter(logging.Formatter('%(asctime)s | %(message)s'))
audit_logger.addHandler(audit_handler)
audit_logger.setLevel(logging.INFO)

def mask_path(abs_path):
    try:
        rel = os.path.relpath(abs_path, BASE_DIR)
        if rel.startswith(".."):
            return f"[REDACTED]\\{os.path.basename(abs_path)}"
        return f"[REDACTED]\\{rel}"
    except Exception:
        return "[REDACTED]"

def audit_log(action, target, ip="unknown"):
    user = session.get("username", "unknown")
    audit_logger.info(f"{user} | {ip} | {action} | {target}")

# -------- CSRF PROTECTION --------
@app.before_request
def ensure_csrf_token():
    if 'csrf_token' not in session:
        session['csrf_token'] = secrets.token_hex(32)

@app.context_processor
def inject_csrf():
    return dict(csrf_token=session.get('csrf_token', ''))

def csrf_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = request.headers.get('X-CSRF-Token') or \
                request.form.get('_csrf_token') or \
                (request.get_json(silent=True) or {}).get('csrf_token')
        if not token or token != session.get('csrf_token'):
            return jsonify({"error": "CSRF validation failed"}), 403
        return f(*args, **kwargs)
    return wrapper

# -------- SECURITY: PATH TRAVERSAL PROTECTION --------
def safe_join(base, *paths):
    """
    Safely join path components ensuring the absolute target path 
    resolves strictly within the base directory boundary.
    Handles case-insensitivity on Windows platforms.
    """
    base_abs = os.path.abspath(base)
    joined = os.path.join(base_abs, *paths)
    abs_path = os.path.abspath(os.path.realpath(joined))
    
    # Windows is case-insensitive, normalize case for comparison
    norm_base = os.path.normcase(base_abs)
    norm_path = os.path.normcase(abs_path)
    
    if norm_path == norm_base:
        return abs_path
        
    prefix_with_sep = norm_base if norm_base.endswith(os.sep) else norm_base + os.sep
    if not norm_path.startswith(prefix_with_sep):
        raise PermissionError("Access denied: path traversal detected.")
        
    return abs_path

# -------- AUTHENTICATION DECORATOR --------
def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not session.get("logged_in"):
            if request.headers.get('Accept') == 'application/json' or request.is_json:
                return jsonify({"error": "Unauthorized"}), 401
            return redirect("/login")
        return f(*args, **kwargs)
    return wrapper

# -------- HELPER FUNCTIONS --------
def get_file_type(filename):
    ext = os.path.splitext(filename)[1].lower()
    video_exts = {'.mp4', '.webm', '.mkv', '.avi', '.mov', '.flv', '.wmv', '.m4v'}
    audio_exts = {'.mp3', '.wav', '.ogg', '.flac', '.m4a', '.aac', '.wma'}
    image_exts = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico', '.bmp'}
    text_exts = {'.txt', '.log', '.py', '.js', '.json', '.css', '.html', '.md', '.ini', '.conf', '.yaml', '.yml', '.bat', '.sh'}
    archive_exts = {'.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.xz'}
    
    if ext in video_exts: return 'video'
    if ext in audio_exts: return 'audio'
    if ext in image_exts: return 'image'
    if ext in text_exts: return 'text'
    if ext in archive_exts: return 'archive'
    return 'other'

def get_size_str(bytes_size):
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if bytes_size < 1024.0:
            return f"{bytes_size:.2f} {unit}"
        bytes_size /= 1024.0
    return f"{bytes_size:.2f} PB"

def get_storage_stats():
    try:
        total, used, free = shutil.disk_usage(BASE_DIR)
        percent = round((used / total) * 100, 1)
        return {
            "total": total,
            "used": used,
            "free": free,
            "percent": percent,
            "total_str": get_size_str(total),
            "used_str": get_size_str(used),
            "free_str": get_size_str(free)
        }
    except Exception:
        return None

# -------- WEB ROUTING --------

@app.route("/")
@login_required
def home():
    return render_template("index.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if session.get("logged_in"):
        return redirect("/")
        
    if request.method == "POST":
        # Validate CSRF token on login
        form_token = request.form.get('_csrf_token')
        if not form_token or form_token != session.get('csrf_token'):
            return render_template("login.html", error="Session expired, please try again"), 403
            
        username = request.form.get("username")
        password = request.form.get("password")
        
        if username == USERNAME and check_password_hash(PASSWORD_HASH, password):
            session.permanent = True
            session["logged_in"] = True
            session["username"] = username
            session['csrf_token'] = secrets.token_hex(32)  # rotate CSRF on login
            audit_log("LOGIN_SUCCESS", username, request.remote_addr or "unknown")
            return redirect("/")
        else:
            return render_template("login.html", error="Invalid username or password")
            
    return render_template("login.html")

@app.route("/logout", methods=["POST"])
def logout():
    token = request.headers.get('X-CSRF-Token') or request.form.get('_csrf_token')
    if not token or token != session.get('csrf_token'):
        return jsonify({"error": "CSRF validation failed"}), 403
    audit_log("LOGOUT", "", request.remote_addr or "unknown")
    session.clear()
    return redirect("/login")

# -------- JSON API ENDPOINTS --------

@app.route("/api/files", methods=["GET"])
@login_required
def api_list_files():
    req_path = request.args.get("path", "")
    try:
        target_dir = safe_join(BASE_DIR, req_path)
    except PermissionError as pe:
        return jsonify({"error": str(pe)}), 403
        
    if not os.path.exists(target_dir):
        return jsonify({"error": "Directory not found"}), 404
        
    if not os.path.isdir(target_dir):
        return jsonify({"error": "Not a directory"}), 400

    items = []
    try:
        for name in os.listdir(target_dir):
            full_path = os.path.join(target_dir, name)
            stat = os.stat(full_path)
            is_dir = os.path.isdir(full_path)
            
            size = 0 if is_dir else stat.st_size
            mtime = stat.st_mtime
            mtime_str = datetime.datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S')
            
            items.append({
                "name": name,
                "is_dir": is_dir,
                "size": size,
                "size_str": get_size_str(size) if not is_dir else "",
                "mtime": mtime,
                "mtime_str": mtime_str,
                "type": "folder" if is_dir else get_file_type(name)
            })
    except Exception:
        return jsonify({"error": "Failed to list directory contents"}), 500

    # Get parent path relative to base directory
    rel_path = os.path.relpath(target_dir, BASE_DIR)
    if rel_path == ".":
        rel_path = ""
    else:
        rel_path = rel_path.replace(os.sep, "/")
        
    parent_path = ""
    if rel_path:
        parts = rel_path.split("/")
        parent_path = "/".join(parts[:-1]) if len(parts) > 1 else ""

    return jsonify({
        "current_path": rel_path,
        "parent_path": parent_path,
        "items": items,
        "stats": get_storage_stats()
    })

@app.route("/api/stream/<path:req_path>", methods=["GET"])
@login_required
def api_stream_file(req_path):
    try:
        abs_path = safe_join(BASE_DIR, req_path)
    except PermissionError as pe:
        return jsonify({"error": str(pe)}), 403

    if not os.path.exists(abs_path):
        return "File not found", 404
        
    if os.path.isdir(abs_path):
        return "Cannot stream directory", 400

    return send_from_directory(
        os.path.dirname(abs_path),
        os.path.basename(abs_path),
        conditional=True
    )

@app.route("/api/download/<path:req_path>", methods=["GET"])
@login_required
def api_download_file(req_path):
    try:
        abs_path = safe_join(BASE_DIR, req_path)
    except PermissionError as pe:
        return jsonify({"error": str(pe)}), 403

    if not os.path.exists(abs_path):
        return "File not found", 404

    if os.path.isdir(abs_path):
        return "Cannot download directory", 400

    return send_from_directory(
        os.path.dirname(abs_path),
        os.path.basename(abs_path),
        as_attachment=True,
        download_name=os.path.basename(abs_path)
    )

@app.route("/api/upload", methods=["POST"])
@login_required
@csrf_required
def api_upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in request"}), 400
        
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    target_path = request.form.get('path', '')
    try:
        target_dir = safe_join(BASE_DIR, target_path)
    except PermissionError as pe:
        return jsonify({"error": str(pe)}), 403

    if not os.path.exists(target_dir) or not os.path.isdir(target_dir):
        return jsonify({"error": "Target directory does not exist"}), 400

    filename = os.path.basename(file.filename)
    if not filename:
        return jsonify({"error": "Invalid filename"}), 400

    ext = os.path.splitext(filename)[1].lower()
    blocked_exts = {'.html', '.htm', '.svg', '.js', '.mjs', '.wasm', '.xhtml', '.hta', '.jse', '.vbs', '.ps1', '.psm1', '.psd1', '.lnk', '.url'}
    if ext in blocked_exts:
        return jsonify({"error": f"File type '{ext}' is not allowed for security reasons"}), 400

    guessed_type, _ = mimetypes.guess_type(filename)
    if guessed_type and (guessed_type.startswith('text/html') or guessed_type == 'application/x-javascript'):
        return jsonify({"error": "File type is not allowed for security reasons"}), 400

    dest_path = safe_join(target_dir, filename)
    
    try:
        file.save(dest_path)
        audit_log("UPLOAD", mask_path(dest_path), request.remote_addr or "unknown")
        return jsonify({"status": "success", "message": "File uploaded successfully"})
    except Exception as e:
        audit_log("UPLOAD_FAILED", mask_path(dest_path), request.remote_addr or "unknown")
        return jsonify({"error": "Failed to save file"}), 500

@app.route("/api/delete", methods=["POST"])
@login_required
@csrf_required
def api_delete():
    data = request.get_json() or {}
    target = data.get("path", "")
    
    try:
        abs_path = safe_join(BASE_DIR, target)
    except PermissionError as pe:
        return jsonify({"error": str(pe)}), 403

    if abs_path == os.path.abspath(BASE_DIR):
        return jsonify({"error": "Cannot delete root directory"}), 400

    if not os.path.exists(abs_path):
        return jsonify({"error": "Item not found"}), 404

    try:
        if os.path.isdir(abs_path):
            shutil.rmtree(abs_path)
        else:
            os.remove(abs_path)
        audit_log("DELETE", mask_path(abs_path), request.remote_addr or "unknown")
        return jsonify({"status": "success", "message": "Item deleted successfully"})
    except Exception as e:
        audit_log("DELETE_FAILED", mask_path(abs_path), request.remote_addr or "unknown")
        return jsonify({"error": "Failed to delete item"}), 500

@app.route("/api/rename", methods=["POST"])
@login_required
@csrf_required
def api_rename():
    data = request.get_json() or {}
    old_path = data.get("old_path", "")
    new_name = data.get("new_name", "")
    
    try:
        old_abs = safe_join(BASE_DIR, old_path)
    except PermissionError as pe:
        return jsonify({"error": str(pe)}), 403

    if old_abs == os.path.abspath(BASE_DIR):
        return jsonify({"error": "Cannot rename root directory"}), 400

    if not os.path.exists(old_abs):
        return jsonify({"error": "Source item not found"}), 404

    new_name = os.path.basename(new_name)
    if not new_name:
        return jsonify({"error": "Invalid target name"}), 400

    parent_dir = os.path.dirname(old_abs)
    new_abs = safe_join(parent_dir, new_name)

    if os.path.exists(new_abs):
        return jsonify({"error": "An item with this name already exists"}), 400

    try:
        os.rename(old_abs, new_abs)
        audit_log("RENAME", f"{mask_path(old_abs)} -> {mask_path(new_abs)}", request.remote_addr or "unknown")
        return jsonify({"status": "success", "message": "Item renamed successfully"})
    except Exception as e:
        audit_log("RENAME_FAILED", mask_path(old_abs), request.remote_addr or "unknown")
        return jsonify({"error": "Failed to rename item"}), 500

@app.route("/api/create_folder", methods=["POST"])
@login_required
@csrf_required
def api_create_folder():
    data = request.get_json() or {}
    parent_path = data.get("path", "")
    name = data.get("name", "")
    
    try:
        parent_abs = safe_join(BASE_DIR, parent_path)
    except PermissionError as pe:
        return jsonify({"error": str(pe)}), 403

    name = os.path.basename(name)
    if not name:
        return jsonify({"error": "Invalid folder name"}), 400

    new_dir_abs = safe_join(parent_abs, name)
    
    if os.path.exists(new_dir_abs):
        return jsonify({"error": "Folder already exists"}), 400

    try:
        os.makedirs(new_dir_abs, exist_ok=True)
        audit_log("CREATE_FOLDER", mask_path(new_dir_abs), request.remote_addr or "unknown")
        return jsonify({"status": "success", "message": "Folder created successfully"})
    except Exception as e:
        audit_log("CREATE_FOLDER_FAILED", mask_path(new_dir_abs), request.remote_addr or "unknown")
        return jsonify({"error": "Failed to create folder"}), 500

# -------- SECURITY HEADERS --------
@app.after_request
def add_security_headers(resp):
    resp.headers['X-Content-Type-Options'] = 'nosniff'
    resp.headers['X-Frame-Options'] = 'DENY'
    resp.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "script-src 'self'; "
        "style-src 'self' 'unsafe-inline'; "
        "img-src 'self' data:; "
        "media-src 'self'; "
        "object-src 'none'; "
        "base-uri 'self'; "
        "form-action 'self'; "
        "frame-ancestors 'none'"
    )
    resp.headers['X-XSS-Protection'] = '0'
    resp.headers['Referrer-Policy'] = 'no-referrer'
    resp.headers['Permissions-Policy'] = 'geolocation=(), microphone=(), camera=(), fullscreen=()'
    if not request.path.startswith('/api/stream/') and not request.path.startswith('/api/download/'):
        resp.headers['Cache-Control'] = 'no-store'
    if SSL_MODE == 'adhoc':
        resp.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return resp

# -------- RUN SERVER --------
if __name__ == "__main__":
    print("=" * 60)
    print(f"Starting LocalXS Server")
    print(f"Base Directory: {BASE_DIR}")
    print(f"Host:           {HOST}")
    print(f"Port:           {PORT}")
    print(f"Username:       {USERNAME}")
    print(f"SSL/HTTPS Mode: {SSL_MODE.upper()}")
    print("=" * 60)
    start_hotspot_keeper()
    if not ensure_hotspot_on(timeout=30):
        print("ERROR: Could not turn on hotspot within 30s. Exiting.")
        exit(1)

    if not wait_for_host_ip(HOST, timeout=15):
        print(f"ERROR: {HOST} not available after hotspot turned on. Exiting.")
        exit(1)

    run_args = {
        "host": HOST,
        "port": PORT,
        "threaded": True
    }

    if SSL_MODE == 'adhoc':
        run_args["ssl_context"] = 'adhoc'

    app.run(**run_args)