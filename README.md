# LocalXS — Local eXtended Server

A lightweight, secure HTTPS file sharing and media streaming server designed for local networks. Built with Python and Flask, it runs entirely offline with no external dependencies — ideal for sharing files and streaming media between devices on the same network, either via Windows Mobile Hotspot (no internet uplink required) or over an existing home router network.

## Features

- **File Upload & Download** — Upload files to the shared directory and download them from any device on the network via a clean web interface.
- **Media Streaming** — Stream video (MP4, MKV, AVI, MOV, etc.), audio (MP3, FLAC, M4A, etc.), and view images directly in the browser without downloading first.
- **HTTPS by Default** — Self-signed SSL (adhoc mode) for encrypted transfers, with a plain HTTP fallback option.
- **Authentication** — Session-based login with CSRF protection. Default credentials: `admin` / `1234` (configurable via `.env` or CLI flags).
- **Directory Listing** — Browse the shared folder tree with sortable columns (name, size, date) in grid or list view.
- **File Management** — Create folders, rename, and delete items directly from the web UI.
- **Search & Filter** — Live client-side search to quickly find files by name.
- **Audit Logging** — All actions (login, upload, delete, rename) are logged to `server_audit.log`.
- **Auto Hotspot (no internet required)** — Automatically enables Windows Mobile Hotspot and waits for the network interface to be ready before starting the server. Works in fully isolated environments with no internet uplink, and re-enables the hotspot if Windows turns it off.
- **Home LAN Mode** — `--mode lan` skips the hotspot and serves over an existing network (e.g., your home router) instead.

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
1. Turn on Windows Mobile Hotspot (works without any internet uplink)
2. Wait for the hotspot interface (`192.168.137.1`) to be ready
3. Serve the web app at `https://192.168.137.1:8000`

Connect your device to the hotspot, open `https://192.168.137.1:8000`, and log in.

To share over an existing home router network instead, see [Network Modes](#network-modes).

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
| `--mode` | `hotspot` | `hotspot` (start Windows Mobile Hotspot) or `lan` (bind to an existing network, no hotspot) |

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

## Network Modes

### Hotspot mode (default) — isolated, no internet required

```bash
python server.py
```

The server turns on Windows Mobile Hotspot automatically and binds to the hotspot interface (`192.168.137.1`). No internet uplink is needed — the hotspot is anchored on the Wi-Fi adapter itself, so this works in fully isolated environments. A background keeper re-enables the hotspot if Windows turns it off (power saving).

Devices join the hotspot SSID and open `https://192.168.137.1:8000`.

### LAN mode — share over your home router

```bash
python server.py --mode lan --host 192.168.1.14
```

Skips the hotspot entirely and binds to your machine's existing LAN IP, making the server reachable by every device on the home network.

Setup checklist:

1. **Firewall** — create one inbound rule (*Windows Defender Firewall with Advanced Security* → Inbound Rules → New Rule → **Custom**):
   - Protocol: TCP, local port `8000`
   - Local IP: your machine's LAN IP (e.g. `192.168.1.14`)
   - Remote IP: your LAN subnet only (e.g. `192.168.1.0/24`)
   - Action: allow the connection; name it e.g. `LocalXS (home LAN 8000)`
2. **DHCP reservation** — reserve the machine's IP in the router admin page so it doesn't change.
3. **No port forwarding** — never forward port 8000 in the router; NAT is what keeps the server invisible from the internet.
4. **Strong password** — set `ADMIN_PASSWORD` in `.env`; the default `1234` is unsafe on a shared network.

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
├── test/                  # Hotspot probe & verification scripts
└── shared/                # Default shared directory (created on first run)
```

## Future Improvements Plan

1. **Multi-User Access with Access Control** — Role-based accounts (admin, uploader, viewer) with per-directory permissions so different users see and interact with different parts of the file tree.

2. **Higher Quality Media Streaming** — On-the-fly audio transcoding to ensure compatibility across devices, support for multiple audio tracks (language/subtitle streams in MKV/MP4), and embedded or external subtitle rendering (SRT, VTT, ASS) in the browser player.
