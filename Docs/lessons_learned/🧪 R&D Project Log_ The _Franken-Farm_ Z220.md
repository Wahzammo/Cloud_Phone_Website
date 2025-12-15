# **🧪 R\&D Project Log: The "Franken-Farm" Z220**

Project Lead: Aaron (CTO)  
Engineering: Z220 Lab Manager  
Date: December 14, 2025  
Status: PHASE 3 COMPLETE (GPU Accelerated & Rooted)

## **1\. The "Binder" Incident (Kernel Panic)**

Symptom: Redroid containers crashed immediately on boot.  
Cause: Ubuntu Desktop 22.04 installs "HWE" Kernel 6.x. Android 12 requires legacy ashmem/binder.  
The Fix:

* **OS:** Switched to **Ubuntu Server 22.04 LTS** (Kernel 5.15.0-x).  
* **Persistence:** Created /etc/modules-load.d/redroid.conf to force load binder\_linux on boot.

## **2\. The "Dead Script" Incident (Dependency Hell)**

Symptom: Build script crashed with SSL/Connection errors.  
Cause: Hardcoded download link to dead androidfilehost.  
The Fix:

* **Patch:** Used sed to replace the dead link with the official GitHub release of Magisk v27.0 inside stuffs/magisk.py.

## **3\. The "Locked Keys" Incident (ADB Lockout)**

Symptom: Containers Up but ADB said Connection Refused.  
Cause: Added ro.debuggable=0 to Docker command. On headless Redroid, this kills the ADB daemon.  
The Fix:

* **Revert:** Removed locking flags.  
* **Strategy:** Stay debuggable (ro.debuggable=1) but use **Shamiko** to lie to the game.

## **4\. The "Black Screen" Incident (GPU Drivers)**

Symptom: scrcpy connected (720p) but showed black screen. dumpsys showed SwiftShader (CPU).  
Cause: Forced minigbm (Intel) drivers on AMD hardware.  
The Fix:

* **Driver:** Removed minigbm.  
* **Config:** Added android.hardware.gralloc=gbm, ro.hardware.vulkan=radeon, and redroid\_gpu\_mode=host.  
* **Result:** dumpsys confirmed AMD Radeon RX 580\.

## **5\. The "Race Condition" (Docker Auto-Start)**

Symptom: Files persist after reboot, but Docker containers do not start automatically.  
Cause: Docker service starts before the rc.local script fixes the /dev/dri permissions. Containers crash on launch.  
Next Step (Monday): Create a Systemd Override to force Docker to wait for permissions.

## **6\. Architecture Decisions (Final State)**

* **Rooting:** Image built with **Magisk** (v27.0).  
* **Spoofing:** **Docker Flags** (ro.product.model=...) used for base identity (Samsung Tablet).  
* **Hiding:** **Shamiko** \+ **Play Integrity Fix** (Modules) to hide Root/Debug status.  
* **Resources:** Capped at **2 vCPUs / 6GB RAM** per node.

*End of Log.*