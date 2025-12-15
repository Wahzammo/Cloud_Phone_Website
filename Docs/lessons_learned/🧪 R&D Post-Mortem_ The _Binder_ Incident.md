# **🧪 R\&D Post-Mortem: The "Binder" Incident**

Date: December 11, 2025  
Subject: Kernel Module Failures on Ivy Bridge (Z220)  
Status: Resolved via Rollback Strategy

## **1\. The Failure Mode**

We attempted to run **Redroid** (Android Container) on **Ubuntu 22.04 Desktop**. The system failed to load critical Android kernel modules (binder\_linux and ashmem\_linux), resulting in container crashes.

### **Root Cause Analysis**

1. **Hardware Age:** The Intel i7-3770 (Ivy Bridge) relies on legacy driver support.  
2. **The "HWE" Trap:** Ubuntu Desktop defaults to the **Hardware Enablement (HWE) Kernel 6.x** for better support of *new* hardware.  
3. **The Conflict:**  
   * Kernel 5.18+ **removed** the ashmem driver (deprecated in favor of memfd).  
   * Kernel 5.19+ hid the kallsyms\_lookup\_name function for security, breaking the compilation of legacy Redroid modules.  
4. **The "Desktop" Complication:** NetworkManager (Desktop) fought with manual ip route commands (Server), causing a "Split Brain" network failure where the machine had an IP but no gateway (noprefixroute), bricking internet access.

## **2\. The Solution Strategy (Rev 3.0)**

We are abandoning the "Desktop" approach. The fix is architectural, not patch-based.

### **The "Golden Path" Protocol**

* **OS:** Switch to **Ubuntu Server 22.04 LTS**.  
* **Kernel:** STRICTLY enforce **Linux Kernel 5.15 LTS (GA)**.  
  * *Why:* 5.15 includes binder and ashmem natively. No compilation required.  
* **Network:** Use netplan (Server) instead of NetworkManager (Desktop).  
  * *Why:* Static, predictable IP assignment on eno1.  
* **Container:** Use **Redroid 12**.  
  * *Why:* Android 12 is the last version to support minigbm reliably on Intel HD 4000 graphics while meeting *Legend of YMIR* requirements.

## **3\. Key Command references (For Future Debugging)**

If binder ever fails again, run these diagnostic commands:

\# Check running kernel version (Must be 5.15.x)  
uname \-r

\# Check if modules are loaded  
lsmod | grep \-E "binder|ashmem"

\# Check network route (Must have a 'default' line)  
ip route show  
