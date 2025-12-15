#!/bin/bash

echo "---------------------------------------------------"
echo "🛠️  Franken-Farm Persistence Setup (Binder + GPU)"
echo "---------------------------------------------------"

# 1. Ensure Module Loading
echo "[1/3] Configuring Kernel Modules..."
echo "binder_linux" | sudo tee /etc/modules-load.d/redroid.conf > /dev/null

# 2. Ensure Module Options
echo "[2/3] Configuring Module Options..."
echo 'options binder_linux devices="binder,hwbinder,vndbinder"' | sudo tee /etc/modprobe.d/redroid.conf > /dev/null

# 3. Configure Boot Permissions (rc.local)
echo "[3/3] Creating Boot Permission Script..."

# Create the rc.local file content
cat <<EOF | sudo tee /etc/rc.local > /dev/null
#!/bin/bash
# Z220 Franken-Farm Boot Fixes

# 1. Unlock Binder Nodes (Using BinderFS)
# Note: Ubuntu 22.04 with Kernel 5.15+ uses binderfs mounted at /dev/binderfs
# If the folder doesn't exist, we might need to mount it, but usually systemd handles it.
chmod 666 /dev/binderfs/*

# 2. Unlock GPU Nodes (AMD RX 580)
chmod 666 /dev/dri/*

exit 0
EOF

# Make it executable
sudo chmod +x /etc/rc.local

# 4. Enable rc-local service (Ubuntu 22.04 sometimes disables it by default)
# We create a systemd service to ensure rc.local runs
cat <<EOF | sudo tee /etc/systemd/system/rc-local.service > /dev/null
[Unit]
Description=/etc/rc.local Compatibility
ConditionPathExists=/etc/rc.local

[Service]
Type=forking
ExecStart=/etc/rc.local
TimeoutSec=0
StandardOutput=tty
RemainAfterExit=yes
SysVStartPriority=99

[Install]
WantedBy=multi-user.target
EOF

# Enable the service
sudo systemctl enable rc-local.service > /dev/null 2>&1
sudo systemctl start rc-local.service > /dev/null 2>&1

echo "---------------------------------------------------"
echo "✅ Persistence Setup Complete."
echo "   - Binder drivers will load automatically."
echo "   - Permissions for Binder and GPU will unlock on boot."
echo "---------------------------------------------------"
echo "👉 You can now safely 'sudo reboot' anytime."