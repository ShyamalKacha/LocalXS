import socket
import subprocess
import threading
import time


CHECK_INTERVAL = 15


def _run_powershell(script: str):
    return subprocess.run(
        ["powershell", "-ExecutionPolicy", "Bypass", "-Command", script],
        capture_output=True,
        text=True
    )


def get_hotspot_state():
    script = r"""
    Add-Type -AssemblyName System.Runtime.WindowsRuntime;

    $profile = [Windows.Networking.Connectivity.NetworkInformation,Windows,ContentType=WindowsRuntime]::GetInternetConnectionProfile();

    if ($profile -eq $null) {
        Write-Output "NoProfile"
        exit
    }

    $manager = [Windows.Networking.NetworkOperators.NetworkOperatorTetheringManager,Windows,ContentType=WindowsRuntime]::CreateFromConnectionProfile($profile);

    Write-Output $manager.TetheringOperationalState
    """

    result = _run_powershell(script)

    return result.stdout.strip()


def turn_on_hotspot():
    script = r"""
    Add-Type -AssemblyName System.Runtime.WindowsRuntime;

    $profile = [Windows.Networking.Connectivity.NetworkInformation,Windows,ContentType=WindowsRuntime]::GetInternetConnectionProfile();

    if ($profile -eq $null) {
        Write-Output "NoProfile"
        exit
    }

    $manager = [Windows.Networking.NetworkOperators.NetworkOperatorTetheringManager,Windows,ContentType=WindowsRuntime]::CreateFromConnectionProfile($profile);

    $result = $manager.StartTetheringAsync().GetAwaiter().GetResult();

    Write-Output $result.Status
    """

    result = _run_powershell(script)

    return result.stdout.strip()


def hotspot_loop(verbose=True):
    while True:
        try:
            state = get_hotspot_state()

            if verbose:
                print(f"[HotspotKeeper] State: {state}")

            if state != "On":
                if verbose:
                    print("[HotspotKeeper] Turning hotspot ON...")

                result = turn_on_hotspot()

                if verbose:
                    print(f"[HotspotKeeper] Result: {result}")

        except Exception as e:
            print("[HotspotKeeper] Error:", e)

        time.sleep(CHECK_INTERVAL)


def ensure_hotspot_on(timeout=30, verbose=True):
    """
    Blocking call that waits until the hotspot is ON.
    Turns it on if off, retries until timeout.
    Returns True if hotspot is on, False if timed out.
    """
    start = time.time()
    while time.time() - start < timeout:
        try:
            state = get_hotspot_state()

            if verbose:
                print(f"[HotspotKeeper] State: {state}")

            if state == "On":
                return True

            if verbose:
                print("[HotspotKeeper] Turning hotspot ON...")

            result = turn_on_hotspot()

            if verbose:
                print(f"[HotspotKeeper] Result: {result}")

        except Exception as e:
            print("[HotspotKeeper] Error:", e)

        time.sleep(2)

    return False


def wait_for_host_ip(host, timeout=15, verbose=True):
    """
    Blocking call that waits until IP is bound to an interface.
    """
    start = time.time()
    while time.time() - start < timeout:
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.bind((host, 0))
            sock.close()
            return True
        except OSError:
            if verbose:
                print(f"[HotspotKeeper] Waiting for {host} to become available...")
            time.sleep(1)
    return False


def start_hotspot_keeper(verbose=True, daemon=True):
    """
    Starts hotspot monitoring in background thread.

    Example:
        start_hotspot_keeper()
    """

    thread = threading.Thread(
        target=hotspot_loop,
        kwargs={"verbose": verbose},
        daemon=daemon
    )

    thread.start()

    return thread