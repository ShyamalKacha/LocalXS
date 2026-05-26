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