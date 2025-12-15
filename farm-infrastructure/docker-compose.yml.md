version: "3.8"

services:  
  \# Node 1 (Tab S9 Ultra) \- Port 5555  
  redroid1:  
    image: redroid/redroid:12.0.0\_gapps\_ndk\_magisk\_widevine  
    container\_name: redroid-1  
    privileged: true  
    restart: unless-stopped  
    ports:  
      \- "5555:5555"  
    deploy:  
      resources:  
        limits:  
          cpus: '2.0'  
          memory: 6G  
    volumes:  
      \- ./data1:/data  
    devices:  
      \- /dev/binder:/dev/binder  
      \- /dev/hwbinder:/dev/hwbinder  
      \- /dev/vndbinder:/dev/vndbinder  
      \- /dev/dri:/dev/dri  
    command:  
      \# AMD RX 580 Specific Config  
      \- android.hardware.gralloc=gbm  
      \- ro.hardware.egl=mesa  
      \- ro.hardware.vulkan=radeon  
      \- androidboot.redroid\_gpu\_mode=host  
      \# Identity Spoofing (Tab S9 Ultra)  
      \- ro.product.model=SM-X916B  
      \- ro.product.brand=samsung  
      \- ro.product.manufacturer=samsung  
      \- ro.product.device=zeppelin  
      \- ro.build.fingerprint=samsung/zeppelin/zeppelin:12/SP1A.210812.016/X916BXXU4BWL1:user/release-keys  
     \- scrcpy.max\_fps=30

  \# Node 2 (Tab S9+) \- Port 5556  
  redroid2:  
    image: redroid/redroid:12.0.0\_gapps\_ndk\_magisk\_widevine  
    container\_name: redroid-2  
    privileged: true  
    restart: unless-stopped  
    ports:  
      \- "5556:5555"  
    deploy:  
      resources:  
        limits:  
          cpus: '2.0'  
          memory: 6G  
    volumes:  
      \- ./data2:/data  
    devices:  
      \- /dev/binder:/dev/binder  
      \- /dev/hwbinder:/dev/hwbinder  
      \- /dev/vndbinder:/dev/vndbinder  
      \- /dev/dri:/dev/dri  
    command:  
      \# AMD RX 580 Specific Config  
      \- android.hardware.gralloc=gbm  
      \- ro.hardware.egl=mesa  
      \- ro.hardware.vulkan=radeon  
      \- androidboot.redroid\_gpu\_mode=host

      \# Identity Spoofing (Tab S9+)  
      \- ro.product.model=SM-X816B  
      \- ro.product.brand=samsung  
      \- ro.product.manufacturer=samsung  
      \- ro.product.device=book4  
      \- ro.build.fingerprint=samsung/book4/book4:12/SP1A.210812.016/X816BXXU4BWL1:user/release-keys  
      \- scrcpy.max\_fps=30

  \# Node 3 (Tab S10 Ultra) \- Port 5557  
  redroid3:  
    image: redroid/redroid:12.0.0\_gapps\_ndk\_magisk\_widevine  
    container\_name: redroid-3  
    privileged: true  
    restart: unless-stopped  
    ports:  
      \- "5557:5555"  
    deploy:  
      resources:  
        limits:  
          cpus: '2.0'  
          memory: 6G  
    volumes:  
      \- ./data3:/data  
    devices:  
      \- /dev/binder:/dev/binder  
      \- /dev/hwbinder:/dev/hwbinder  
      \- /dev/vndbinder:/dev/vndbinder  
      \- /dev/dri:/dev/dri  
    command:  
       \# AMD RX 580 Specific Config  
       \- android.hardware.gralloc=gbm  
       \- ro.hardware.egl=mesa  
       \- ro.hardware.vulkan=radeon  
       \- androidboot.redroid\_gpu\_mode=host  
      \# Identity Spoofing (Tab S10 Ultra \- SM-X926B)  
      \- ro.product.model=SM-X926B  
      \- ro.product.name=gts10u  
      \- ro.product.device=gts10u  
      \- ro.product.brand=Samsung  
      \- ro.product.manufacturer=Samsung  
      \- ro.product.system.brand=Samsung  
      \- ro.product.system.manufacturer=Samsung  
      \# Extra Attestation Props  
      \- ro.product.brand\_for\_attestation=samsung  
      \- ro.product.device\_for\_attestation=gts10u  
      \- ro.product.manufacturer\_for\_attestation=Samsung  
      \- ro.product.model\_for\_attestation=SM-X926B  
      \- ro.product.name\_for\_attestation=Samsung Tab S10 Ultra  
      \- scrcpy.max\_fps=30

  \# Node 4 (Tab S8 Ultra) \- Port 5558  
  redroid4:  
    image: redroid/redroid:12.0.0\_gapps\_ndk\_magisk\_widevine  
    container\_name: redroid-4  
    privileged: true  
    restart: unless-stopped  
    ports:  
      \- "5558:5555"  
    deploy:  
      resources:  
        limits:  
          cpus: '2.0'  
          memory: 6G  
    volumes:  
      \- ./data4:/data  
    devices:  
      \- /dev/binder:/dev/binder  
      \- /dev/hwbinder:/dev/hwbinder  
      \- /dev/vndbinder:/dev/vndbinder  
      \- /dev/dri:/dev/dri  
    command:  
      \# AMD RX 580 Specific Config  
      \- android.hardware.gralloc=gbm  
      \- ro.hardware.egl=mesa  
      \- ro.hardware.vulkan=radeon  
      \- androidboot.redroid\_gpu\_mode=host

      \# Identity Spoofing (Tab S8 Ultra)  
      \- ro.product.model=SM-X906B  
      \- ro.product.brand=samsung  
      \- ro.product.manufacturer=samsung  
      \- ro.product.device=book3  
      \- ro.build.fingerprint=samsung/book3/book3:12/SP1A.210812.016/X906BXXU4BWL1:user/release-keys  
       \- scrcpy.max\_fps=30

## PERSISTENCE SCRIPT:

\#\!/bin/bash

echo "---------------------------------------------------"  
echo "🛠️  Franken-Farm Persistence Setup (Binder \+ GPU)"  
echo "---------------------------------------------------"

\# 1\. Ensure Module Loading  
echo "\[1/3\] Configuring Kernel Modules..."  
echo "binder\_linux" | sudo tee /etc/modules-load.d/redroid.conf \> /dev/null

\# 2\. Ensure Module Options  
echo "\[2/3\] Configuring Module Options..."  
echo 'options binder\_linux devices="binder,hwbinder,vndbinder"' | sudo tee /etc/modprobe.d/redroid.conf \> /dev/null

\# 3\. Configure Boot Permissions (rc.local)  
echo "\[3/3\] Creating Boot Permission Script..."

\# Create the rc.local file content  
cat \<\<EOF | sudo tee /etc/rc.local \> /dev/null  
\#\!/bin/bash  
\# Z220 Franken-Farm Boot Fixes

\# 1\. Unlock Binder Nodes  
chmod 666 /dev/binderfs/\*

\# 2\. Unlock GPU Nodes (AMD RX 580\)  
chmod 666 /dev/dri/\*

exit 0  
EOF

\# Make it executable  
sudo chmod \+x /etc/rc.local

\# 4\. Enable rc-local service (Ubuntu 22.04 sometimes disables it by default)  
\# We create a systemd service to ensure rc.local runs  
cat \<\<EOF | sudo tee /etc/systemd/system/rc-local.service \> /dev/null  
\[Unit\]  
Description=/etc/rc.local Compatibility  
ConditionPathExists=/etc/rc.local

\[Service\]  
Type=forking  
ExecStart=/etc/rc.local  
TimeoutSec=0  
StandardOutput=tty  
RemainAfterExit=yes  
SysVStartPriority=99

\[Install\]  
WantedBy=multi-user.target  
EOF

\# Enable the service  
sudo systemctl enable rc-local.service \> /dev/null 2\>&1  
sudo systemctl start rc-local.service \> /dev/null 2\>&1

echo "---------------------------------------------------"  
echo "✅ Persistence Setup Complete."  
echo "   \- Binder drivers will load automatically."  
echo "   \- Permissions for Binder and GPU will unlock on boot."  
echo "---------------------------------------------------"  
echo "👉 You can now safely 'sudo reboot' anytime."  
