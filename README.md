# LocalXS — Local eXtended Server

A lightweight, secure HTTPS file sharing and media streaming server designed for local networks. Built with Python and Flask, it runs entirely offline with no external dependencies — ideal for sharing files and streaming media between devices on the same network (e.g., via Windows Mobile Hotspot).

## Features

- **File Upload & Download** — Upload files to the shared directory and download them from any device on the network via a clean web interface.
- **Media Streaming** — Stream video (MP4, MKV, AVI, MOV, etc.), audio (MP3, FLAC, M4A, etc.), and view images directly in the browser without downloading first.
- **HTTPS by Default** — Self-signed SSL (adhoc mode) for encrypted transfers, with a plain HTTP fallback option.
- **Authentication** — Session-based login with CSRF protection. Default credentials: `admin` / `1234` (configurable via `.env` or CLI flags).
- **Directory Listing** — Browse the shared folder tree with sortable columns (name, size, date) in grid or list view.
- **File Management** — Create folders, rename, and delete items directly from the web UI.
- **Search & Filter** — Live client-side search to quickly find files by name.
- **Audit Logging** — All actions (login, upload, delete, rename) are logged to `server_audit.log`.
- **Auto Hotspot** — Automatically enables Windows Mobile Hotspot and waits for the network interface to be ready before starting the server.

## Requirements

- Windows 10/11 (for hotspot auto-start)
- Python 3.11+
- `flask` and `python-dotenv` (see `requirements.txt`)

## Quick Start

```bash
# 1. Clone or download the project
cd LocalXS

# 2. (Recommended) Create and activate a virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# 3. Install dependencies
pip install -r requirements.txt

# 4. (Optional) Customise credentials in .env
#    ADMIN_USERNAME=admin
#    ADMIN_PASSWORD=1234

# 5. Start the server
python server.py
```

The server will:
1. Check/turn on Windows Mobile Hotspot (if the host IP is `192.168.137.1`)
2. Wait for the network interface to be ready
3. Serve the web app at `https://192.168.137.1:8000`

Open `https://192.168.137.1:8000` in any device on the same network and log in.

## Usage

### CLI Options

| Flag | Default | Description |
|---|---|---|
| `--dir` | `./shared` | Base directory for shared files |
| `--host` | `192.168.137.1` | Server bind address |
| `--port` | `8000` | Server port |
| `--user` | `admin` | Login username |
| `--pwd` | `1234` | Login password |
| `--ssl` | `adhoc` | `adhoc` for HTTPS or `none` for plain HTTP |

Example with custom directory and plain HTTP:
```bash
python server.py --dir "D:\shared" --ssl none
```

### Web Interface

- **Browse** — Navigate the shared folder tree; switch between grid and list views.
- **Sort** — Click column headers or use the sort dropdown (name, size, date; ascending/descending).
- **Upload** — Use the upload button in the header to add files to the current directory.
- **Stream** — Click video/audio files to preview/stream them in-browser.
- **Manage** — Right-click or use the context menu to rename, delete, or create folders.

## Project Details

- **Backend**: Python 3 / Flask
- **Frontend**: Vanilla JavaScript, HTML5, CSS3 (no frameworks)
- **HTTPS**: Self-signed certificate via Werkzeug's `ssl_context='adhoc'`
- **Security**: Session-based auth, CSRF tokens, path traversal protection, security headers (CSP, HSTS, X-Frame-Options, etc.)
- **Logging**: Audit trail of all authenticated operations

## Project Structure

```
LocalXS/
├── server.py              # Flask application — routes, auth, API
├── hotspot_keeper.py      # Windows hotspot auto-start & keep-alive
├── requirements.txt       # Python dependencies
├── .env                   # User credentials (optional)
├── templates/
│   ├── index.html         # Main file browser UI
│   └── login.html         # Login page
├── static/
│   ├── css/style.css      # Styles
│   ├── js/app.js          # Frontend logic
│   └── favicon.svg        # Tab icon
└── shared/                # Default shared directory (created on first run)
```

## Future Improvements Plan

1. **Multi-User Access with Access Control** — Role-based accounts (admin, uploader, viewer) with per-directory permissions so different users see and interact with different parts of the file tree.

2. **Higher Quality Media Streaming** — On-the-fly audio transcoding to ensure compatibility across devices, support for multiple audio tracks (language/subtitle streams in MKV/MP4), and embedded or external subtitle rendering (SRT, VTT, ASS) in the browser player.
