import subprocess
import os
import time
import signal
import tempfile
from contextlib import contextmanager


@contextmanager
def openvpn_connection(openvpn_config):
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".ovpn", delete=False
    ) as temp_file:
        temp_file.write(openvpn_config)
        temp_openvpn_config_path = temp_file.name

    username = os.getenv("OPENVPN_USERNAME")
    password = os.getenv("OPENVPN_PASSWORD")

    process = subprocess.Popen(
        [
            "sudo",
            "openvpn",
            "--config",
            temp_openvpn_config_path,
            "--auth-user-pass",
            "/dev/stdin",
        ],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        universal_newlines=True,
    )
    process.stdin.write(f"{username}\n{password}\n")
    process.stdin.flush()

    try:
        time.sleep(5)
        yield process
    finally:
        process.send_signal(signal.SIGTERM)
        process.wait()

        if os.path.exists(temp_openvpn_config_path):
            os.unlink(temp_openvpn_config_path)
