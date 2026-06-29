this project works correctly and streams video properly 90% of the time but some videos have some issue, the video streams but its audio dont work, in frontend the volume button gets disabled(greyed out), i think it is an issue with audio format/codec

what i want is
    1) the video should be untouched
    2) supported audio should be untouched
    3) the unsuported audio should be converted to supported type but it should be in highest possible quality, no compromise, best ultimate audio quality and bitrate

currently mkv and mp4 both videos play there is only issue with audio in some video files.


Here is my idea with some REFRENCE code
In the media server world, this is known as a **"Sidecar Audio"** approach. 

By extracting *only* the audio track and saving it as a separate, small file next to the video, you completely bypass the 40GB temporary space issue. A 20GB movie will only generate a ~200MB audio file. The original 20GB file remains **100% untouched**, and because both files physically exist on your drive, Flask's native `send_from_directory` will handle **instant, perfect seeking** for both.

The only challenge is that web browsers do not natively sync a `<video>` tag and an `<audio>` tag. If the video buffers, the audio will keep playing and go out of sync. We can easily fix this with a few lines of JavaScript.

Here is the complete blueprint to implement this.

### Step 1: The Sidecar Extractor Script
Save this as `extract_sidecar_audio.py` and run it once. It will scan your library, leave supported files alone, and generate high-quality `.m4a` (AAC 320kbps) sidecar files *only* for videos with unsupported audio.

```python
import os
import subprocess
import json

BASE_DIR = "shared" # Change this to your actual shared directory
SUPPORTED_AUDIO_CODECS = {'aac', 'mp3', 'opus', 'vorbis', 'ac3'}
VIDEO_EXTS = {'.mp4', '.mkv', '.avi', '.mov', '.flv', '.wmv', '.m4v', '.webm'}

def get_media_info(filepath):
    cmd = ['ffprobe', '-v', 'quiet', '-print_format', 'json', '-show_streams', filepath]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return json.loads(result.stdout)
    except Exception:
        return None

def extract_sidecars():
    for root, dirs, files in os.walk(BASE_DIR):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext not in VIDEO_EXTS:
                continue
                
            filepath = os.path.join(root, file)
            sidecar_path = filepath + ".audio.m4a"
            
            # Skip if we already extracted the audio for this file
            if os.path.exists(sidecar_path):
                continue
                
            info = get_media_info(filepath)
            if not info: continue
            
            audio_streams = [s for s in info.get('streams', []) if s.get('codec_type') == 'audio']
            if not audio_streams: continue
            
            # Check if ANY audio track is unsupported
            needs_fix = any(a.get('codec_name') not in SUPPORTED_AUDIO_CODECS for a in audio_streams)
            if not needs_fix:
                continue
                
            print(f"Extracting sidecar audio for: {file}")
            
            # Extract the first audio track, convert to ultimate quality AAC
            cmd = [
                'ffmpeg', '-i', filepath,
                '-map', '0:a:0',       # Only the first audio track
                '-c:a', 'aac',         # Universally supported by browsers
                '-b:a', '320k',        # Highest standard quality
                '-y', sidecar_path
            ]
            
            try:
                subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
                print(f" -> Saved: {sidecar_path}")
            except Exception as e:
                print(f" -> Failed: {e}")

if __name__ == "__main__":
    extract_sidecars()
```

### Step 2: Tell the Frontend About the Sidecar Files
You need to make a tiny modification to your `server.py` so the frontend knows when to load the sidecar audio. 

Find your `api_list_files` function in `server.py`. Inside the `for name in os.listdir(target_dir):` loop, add a check for the sidecar file:

```python
        # ... existing code ...
        is_dir = os.path.isdir(full_path)
        size = 0 if is_dir else stat.st_size
        
        # ADD THIS: Check if a sidecar audio file exists
        has_sidecar = False
        if not is_dir and get_file_type(name) == 'video':
            has_sidecar = os.path.exists(full_path + ".audio.m4a")
            
        items.append({
            "name": name,
            "is_dir": is_dir,
            "size": size,
            "size_str": get_size_str(size) if not is_dir else "",
            "mtime": mtime,
            "mtime_str": mtime_str,
            "type": "folder" if is_dir else get_file_type(name),
            "has_sidecar": has_sidecar  # <-- Send this to the frontend
        })
```

### Step 3: The Frontend JavaScript Sync Logic
In your frontend HTML/JS (wherever your `<video>` player is rendered), you need to add a hidden `<audio>` element and use JavaScript to lock them together. 

When a user clicks a video, check if `file.has_sidecar` is true. If it is, load the video URL into the `<video>` tag (muted), and load the sidecar URL (`/api/stream/path/to/file.mkv.audio.m4a`) into the `<audio>` tag.

Add this HTML and JavaScript to your frontend player logic:

```html
<!-- Your main video element -->
<video id="mainVideo" controls preload="auto"></video>

<!-- Hidden audio element for the sidecar -->
<audio id="sidecarAudio" preload="auto"></audio>

<script>
const video = document.getElementById('mainVideo');
const audio = document.getElementById('sidecarAudio');
let isSyncing = false;

// Call this function when a user clicks a video file
function loadMedia(videoUrl, hasSidecar) {
    video.src = videoUrl;
    
    if (hasSidecar) {
        // Load the sidecar audio file
        audio.src = videoUrl + ".audio.m4a"; 
        video.muted = true; // Mute original video so we don't hear double/unsupported audio
    } else {
        audio.src = "";
        video.muted = false; // Play native audio if no sidecar exists
    }
    video.play();
}

// 1. Sync Play
video.addEventListener('play', () => {
    if (audio.src) {
        audio.currentTime = video.currentTime;
        audio.play();
    }
});

// 2. Sync Pause
video.addEventListener('pause', () => {
    audio.pause();
});

// 3. Sync Seeking (When user drags the progress bar)
video.addEventListener('seeking', () => {
    isSyncing = true;
    audio.pause();
});

video.addEventListener('seeked', () => {
    if (audio.src) {
        audio.currentTime = video.currentTime;
        audio.play();
    }
    isSyncing = false;
});

// 4. Handle Video Buffering (If video stops to load, audio MUST stop too)
video.addEventListener('waiting', () => {
    audio.pause();
});

video.addEventListener('playing', () => {
    if (audio.src && !video.paused) {
        audio.currentTime = video.currentTime;
        audio.play();
    }
});

// 5. Fallback continuous sync (Fixes micro-drifts over time)
video.addEventListener('timeupdate', () => {
    if (audio.src && !isSyncing && !video.paused) {
        const diff = Math.abs(video.currentTime - audio.currentTime);
        if (diff > 0.3) { // If out of sync by more than 0.3 seconds, force sync
            audio.currentTime = video.currentTime;
        }
    }
});
</script>
```

### Why this is the Ultimate Solution:
1. **Zero Disk Space Bloat:** You are only storing ~200MB of audio per 20GB movie.
2. **100% Untouched Video:** The original MKV/MP4 file is never modified, rewritten, or moved.
3. **Perfect Seeking:** Because both the video and the sidecar audio are physical files on your disk, Flask handles HTTP Range requests natively. Seeking will be instant with zero buffering delays.
4. **No CPU Usage During Playback:** Because the audio was pre-converted by the Python script, your server uses 0% CPU while streaming. It is just serving static files.