# **📂 Master Protocol: The "Franken-Farm" Node Deployment (Rev 5.0 \- Final "As Built")**

Project Lead: Aaron (CTO)  
Engineering: Z220 Lab Manager  
Date: December 13, 2025  
Status: ✅ OPERATIONAL (Stage 2: GPU Accelerated & Spoofed)

## **1\. 🎯 Executive Summary**

The "Franken-Farm" Z220 node is successfully deployed. We have overcome the "Binder" kernel incompatibility and the "Dead Docs" dependency hell. The node is currently running **4x Android 12 instances** on bare-metal Docker, fully accelerated by the **AMD Radeon RX 580**.

**Critical Config:** Nodes are configured to spoof **Samsung Galaxy Tab S8** signatures to evade WEMADE detection, though Root/Magisk was omitted due to mirror outages.

## **2\. 🛠️ The Hardware "Truth" (Final Config)**

* **Node:** HP Z220 CMT  
* **CPU:** Intel Core i7-3770 (Ivy Bridge) @ 3.4GHz  
* **OS:** Ubuntu Server 22.04 LTS (Headless)  
* **Kernel:** **Linux 5.15.0-x-generic** (CRITICAL: Do not upgrade to HWE/6.x)  
* **Graphics:** **AMD Radeon RX 580 (8GB)** (Native amdgpu driver)  
* **IP Address:** 192.168.0.142 (Static)

## **3\. 🧪 The "Binder Incident" & Resolution**

The Problem: Newer Linux Kernels (6.x+) removed ashmem and restricted binder access, causing Redroid to crash.  
The Fix:

1. **OS:** Enforce Ubuntu Server 22.04 (Kernel 5.15 LTS).  
2. **Modules:**  
   apt install linux-modules-extra-$(uname \-r)  
   modprobe binder\_linux devices="binder,hwbinder,vndbinder"

## **4\. 🏗️ The "Frankenstein" Build Process**

Tool Used: abing7k/redroid-script (Fork of standard builder).  
Security Note: Script is open-source Python. Audited to ensure it only pulls from OpenGApps and official sources.  
The Build Command:  
\# \-a 12.0.0 : Android 12  
\# \-g        : Install GApps (Play Store)  
\# \-w        : Install Widevine (DRM)  
\# \-n        : Install Native Bridge (ARM Support)  
\# (Magisk \-m OMITTED due to broken mirror link)

python3 redroid.py \-a 12.0.0 \-g \-w \-n

**Resulting Image:** redroid/redroid:12.0.0-latest-gapps-widevine-nativebridge

## **5\. 🐳 Orchestration (Docker Compose) \- SPOOFING ACTIVE**

Mode: Bridge Mode (Multi-Node).  
Drivers: Removed minigbm (Intel) to allow RX 580 amdgpu usage.  
WEMADE Bypass: Explicit ro.product overwrites in the command section.  
**Port Mapping:**

* Node 1: 5555:5555  
* Node 2: 5556:5555  
* Node 3: 5557:5555  
* Node 4: 5558:5555

**Command Arguments (Applied to all nodes):**

    command:  
      \# \--- HARDWARE SPOOFING (Samsung Galaxy Tab S8) \---  
      \- ro.product.brand=Samsung  
      \- ro.product.manufacturer=Samsung  
      \- ro.product.model=SM-X700  
      \- ro.product.name=gts8wifi  
      \# \-------------------------------------------------  
      \- ro.kernel.qemu=1  
      \- ro.secure=0  
      \- scrcpy.max\_fps=30

## **6\. 🔧 Troubleshooting: The Google Play Login Freeze**

Symptom: Clicking "Sign In" does nothing (Device is Uncertified).  
Fix (The GSF Bypass):

1. **Get ID:** Run on Windows:  
   adb \-s 192.168.0.142:5555 shell "sqlite3 /data/data/com.google.android.gsf/databases/gservices.db 'select \* from main where name \= \\"android\_id\\";'"

2. **Register:** Paste the ID at [google.com/android/uncertified](https://www.google.com/android/uncertified/).  
3. **Reset:** Clear Play Store Storage & Reboot container.

## **7\. 🛡️ Security Audit & Next Steps**

1. **Backdoor Check:** Upon return, run docker history \<image\_id\> to verify layers.  
2. **Magisk Injection:** If WEMADE kicks the device for "Security Violation," we must manually edit redroid-script to fix the download link and rebuild with Root \+ Shamiko.

*End of Report.*