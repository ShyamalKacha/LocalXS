"""
Sidecar Audio Extractor for LocalXS

Scans the shared directory for video files whose audio codecs are not natively
supported by browsers. For each unsupported file, extracts the first audio track
as a high-quality AAC sidecar file (<original>.audio.m4a) placed alongside the
original video.

Browsers only support these audio codecs inside <video> elements:
  AAC, MP3, Opus, Vorbis, FLAC

Common unsupported codecs found in MKV/MP4 rips:
  AC-3 (Dolby Digital), E-AC-3 (Dolby Digital Plus),
  DTS, DTS-HD MA, TrueHD (Dolby TrueHD)

The original video file is NEVER modified.
"""

import os
import subprocess
import json
import sys
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed

# --------------- CONFIG ---------------
SUPPORTED_AUDIO_CODECS = {'aac', 'mp3', 'opus', 'vorbis', 'flac'}
VIDEO_EXTS = {'.mp4', '.mkv', '.avi', '.mov', '.flv', '.wmv', '.m4v', '.webm'}
# Best quality AAC bitrate — the native ffmpeg AAC encoder.
AAC_BITRATE = '320k'
# ---------------------------------------


def get_media_info(filepath):
    """Return the ffprobe JSON output for the given file, or None on error."""
    cmd = [
        'ffprobe', '-v', 'quiet',
        '-print_format', 'json',
        '-show_streams',
        filepath
    ]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return json.loads(result.stdout)
    except (subprocess.CalledProcessError, json.JSONDecodeError, FileNotFoundError):
        return None


def has_unsupported_audio(info):
    """Return True if any audio stream uses an unsupported codec."""
    audio_streams = [s for s in info.get('streams', []) if s.get('codec_type') == 'audio']
    if not audio_streams:
        return False
    return any(a.get('codec_name') not in SUPPORTED_AUDIO_CODECS for a in audio_streams)


def extract_sidecar(video_path, force=False):
    """
    Extract the first audio track as a high-quality AAC sidecar.
    Returns (sidecar_path, True) on success, (None, False) on skip/failure.
    """
    sidecar_path = video_path + ".audio.m4a"

    if os.path.exists(sidecar_path) and not force:
        return None, False  # Already exists

    info = get_media_info(video_path)
    if info is None:
        print(f"  [SKIP] Could not probe: {video_path}")
        return None, False

    if not has_unsupported_audio(info):
        return None, False  # Already supported, nothing to do

    print(f"  [EXTRACT] {os.path.basename(video_path)}")

    cmd = [
        'ffmpeg', '-i', video_path,
        '-map', '0:a:0',          # First audio track only
        '-c:a', 'aac',            # Universal browser support
        '-b:a', AAC_BITRATE,      # Maximum quality
        '-y',
        sidecar_path
    ]

    try:
        subprocess.run(
            cmd,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=True
        )
        size_mb = os.path.getsize(sidecar_path) / (1024 * 1024)
        print(f"    -> {os.path.basename(sidecar_path)} ({size_mb:.1f} MB)")
        return sidecar_path, True
    except subprocess.CalledProcessError as e:
        print(f"    -> FAILED (ffmpeg exit code {e.returncode})")
        # Clean up partial output on failure
        if os.path.exists(sidecar_path):
            os.remove(sidecar_path)
        return None, False


def scan_and_extract(base_dir, force=False, workers=2):
    """Walk base_dir and extract sidecar audio for every video that needs it."""
    videos = []
    for root, _, files in os.walk(base_dir):
        for f in files:
            if os.path.splitext(f)[1].lower() in VIDEO_EXTS:
                videos.append(os.path.join(root, f))

    if not videos:
        print("No video files found.")
        return

    print(f"Found {len(videos)} video file(s). Scanning audio codecs...")

    # First pass: probe and filter to only videos that need extraction
    needs_extraction = []
    for v in videos:
        sidecar_path = v + ".audio.m4a"
        if os.path.exists(sidecar_path) and not force:
            continue  # Already done

        info = get_media_info(v)
        if info is None:
            print(f"  [SKIP] Could not probe: {os.path.basename(v)}")
            continue

        if has_unsupported_audio(info):
            needs_extraction.append(v)

    if not needs_extraction:
        print("All videos have browser-compatible audio. Nothing to extract.")
        return

    print(f"Found {len(needs_extraction)} video(s) with unsupported audio.")
    print(f"Extracting sidecar files (AAC {AAC_BITRATE})...")

    success = 0
    fail = 0

    with ThreadPoolExecutor(max_workers=workers) as executor:
        futures = {executor.submit(extract_sidecar, v, force): v for v in needs_extraction}
        for future in as_completed(futures):
            _, ok = future.result()
            if ok:
                success += 1
            else:
                fail += 1

    print(f"\nDone. {success} extracted, {fail} failed.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Extract sidecar AAC audio for videos with unsupported codecs."
    )
    parser.add_argument(
        "--dir",
        default=os.path.join(os.path.dirname(os.path.abspath(__file__)), "shared"),
        help="Root media directory to scan (default: ./shared)"
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Re-extract even if sidecar already exists"
    )
    parser.add_argument(
        "--workers",
        type=int,
        default=2,
        help="Parallel extraction workers (default: 2)"
    )
    args = parser.parse_args()

    base = os.path.abspath(args.dir)
    if not os.path.isdir(base):
        print(f"Error: directory not found: {base}")
        sys.exit(1)

    print(f"Scanning: {base}")
    scan_and_extract(base, force=args.force, workers=args.workers)
