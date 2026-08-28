import socket
import subprocess
import threading
import time


CHECK_INTERVAL = 15

# PowerShell preamble shared by all hotspot scripts.
#
# Select-AnchorProfile picks the connection profile the tethering API uses:
#   1. The internet profile, when Windows reports verified uplink.
#   2. Any profile bound to the physical Wi-Fi adapter — a saved profile is
#      enough; it does NOT need an active association or internet. This is
#      the isolated-LAN/P2P case the server is designed for.
#   3. Any currently-connected profile on a physical adapter (e.g. Ethernet).
# Virtual adapters (the hotspot's own "Local Area Connection* N") are
# excluded by matching against Get-NetAdapter -Physical GUIDs only.
_PS_PREAMBLE = r"""
Add-Type -AssemblyName System.Runtime.WindowsRuntime;

$n = [Windows.Networking.Connectivity.NetworkInformation,Windows,ContentType=WindowsRuntime];
$t = [Windows.Networking.NetworkOperators.NetworkOperatorTetheringManager,Windows,ContentType=WindowsRuntime];

function Select-AnchorProfile {
    $internet = $n::GetInternetConnectionProfile()
    if ($internet -ne $null) { return $internet }

    # Get-NetAdapter yields "{UPPER-CASE}" CIM strings while WinRT
    # NetworkAdapterId stringifies as lower-case without braces — normalize.
    $physGuids = @{}
    $wifiGuid = $null
    foreach ($a in (Get-NetAdapter -Physical)) {
        $key = ([string]$a.InterfaceGuid).Trim('{}').ToLower()
        $physGuids[$key] = $true
        if ($a.PhysicalMediaType -eq 'Native 802.11' -and $wifiGuid -eq $null `
            -and $a.Status -ne 'Disabled' -and $a.Status -ne 'NotPresent') {
            $wifiGuid = $key
        }
    }

    $wifiCandidate = $null
    $connectedCandidate = $null
    foreach ($p in $n::GetConnectionProfiles()) {
        if ($p.NetworkAdapter -eq $null) { continue }
        $aguid = ([string]$p.NetworkAdapter.NetworkAdapterId).Trim('{}').ToLower()
        if (-not $physGuids.ContainsKey($aguid)) { continue }
        if ($wifiGuid -ne $null -and $aguid -eq $wifiGuid -and $wifiCandidate -eq $null) {
            $wifiCandidate = $p
        }
        if ($connectedCandidate -eq $null -and $p.GetNetworkConnectivityLevel() -ne 'None') {
            $connectedCandidate = $p
        }
    }

    if ($wifiCandidate -ne $null) { return $wifiCandidate }
    return $connectedCandidate
}
"""

_NO_SOURCE_HINT = ("No usable network source for the hotspot "
                   "(enable the Wi-Fi adapter or connect a LAN cable).")


def _run_powershell(script: str):
    return subprocess.run(
        ["powershell", "-ExecutionPolicy", "Bypass", "-Command", script],
        capture_output=True,
        text=True
    )


def _run_hotspot_script(script: str):
    result = _run_powershell(script)
    out = result.stdout.strip()
    if out:
        return out
    err = (result.stderr or "").strip()
    if err:
        return "PowerShellError: " + err.splitlines()[0][:200]
    return "Unknown"


def get_hotspot_state():
    script = _PS_PREAMBLE + r"""
$profile = Select-AnchorProfile
if ($profile -eq $null) {
    Write-Output "NoSource"
    exit
}
$manager = $t::CreateFromConnectionProfile($profile)
Write-Output $manager.TetheringOperationalState
"""
    return _run_hotspot_script(script)


def turn_on_hotspot():
    # StartTetheringAsync is fire-and-forget; the operational state is then
    # polled until On. (.GetAwaiter() is an extension method and cannot be
    # invoked with instance syntax on Windows PowerShell 5.1.)
    script = _PS_PREAMBLE + r"""
$profile = Select-AnchorProfile
if ($profile -eq $null) {
    Write-Output "NoSource"
    exit
}
$manager = $t::CreateFromConnectionProfile($profile)
if ($manager.TetheringOperationalState -eq "On") {
    Write-Output "On"
    exit
}
try {
    $manager.StartTetheringAsync() | Out-Null
} catch {
    Write-Output ("StartError: " + $_.Exception.Message)
    exit
}
$deadline = (Get-Date).AddSeconds(20)
while ((Get-Date) -lt $deadline) {
    if ($manager.TetheringOperationalState -eq "On") { break }
    Start-Sleep -Milliseconds 500
}
Write-Output $manager.TetheringOperationalState
"""
    return _run_hotspot_script(script)


def hotspot_loop(verbose=True):
    while True:
        try:
            state = get_hotspot_state()

            if verbose:
                print(f"[HotspotKeeper] State: {state}")

            if state == "NoSource":
                if verbose:
                    print(f"[HotspotKeeper] {_NO_SOURCE_HINT} Retrying later...")
            elif state != "On":
                if verbose:
                    print("[HotspotKeeper] Turning hotspot ON...")

                result = turn_on_hotspot()

                if verbose:
                    print(f"[HotspotKeeper] Result: {result}")

        except Exception as e:
            print("[HotspotKeeper] Error:", e)

        time.sleep(CHECK_INTERVAL)


def ensure_hotspot_on(timeout=60, verbose=True):
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

            if state == "NoSource":
                if verbose:
                    print(f"[HotspotKeeper] {_NO_SOURCE_HINT} Retrying...")
            else:
                if verbose:
                    print("[HotspotKeeper] Turning hotspot ON...")

                result = turn_on_hotspot()

                if verbose:
                    print(f"[HotspotKeeper] Result: {result}")

                if result == "On":
                    return True

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
