# STAGE 1: Builder / Downloader
# We use a temporary container to download and unzip tools safely.
FROM ubuntu:22.04 AS builder

WORKDIR /tmp

# 1. Install dependencies for extraction
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    zip \
    p7zip-full \
    openssl

# 2. Download Magisk v27.0 (Official Source)
# We rename .apk to .zip to extract it
ENV MAGISK_URL="https://github.com/topjohnwu/Magisk/releases/download/v27.0/Magisk-v27.0.apk"
RUN curl -L -o magisk.zip $MAGISK_URL

# 3. Extract magiskinit (The Key to Root)
# This binary must replace the system init to hijack the boot process.
RUN unzip magisk.zip -d magisk_files
# Check architecture - assuming we are building for x86_64 host running arm64 redroid?
# actually, redroid runs native libraries. If Z220 is x86, we need x86 magisk tools?
# NO: The container OS is Android (likely arm64 or x86_64).
# Most Redroid images are x86_64 with libhoudini (arm translation).
# We will extract the x86_64 magiskinit for the Container OS.
RUN cp magisk_files/lib/x86_64/libmagiskinit.so ./init

# 4. Download MindTheGapps (Android 12.1 / 12L)
# Using a specific known-good version for Android 12
# Note: You might need to update this URL to a direct download link if this one expires.
# For automation, usually we host this zip locally to avoid captcha/mirror issues.
# For now, we assume you have downloaded 'MindTheGapps-12.1.0-x86_64.zip' to the folder.
# COPY MindTheGapps-12.1.0-x86_64.zip .

# ==========================================

# STAGE 2: The Final Image
FROM redroid/redroid:12.0.0-latest

# 1. Copy Magisk Init
# We rename the original init and replace it with Magisk's
COPY --from=builder /tmp/init /init
RUN chmod 755 /init

# 2. Magisk Setup
# We need to ensure the root directory is setup for overlay
RUN mkdir -p /data/adb/magisk

# 3. GApps Integration (Simplified)
# Integrating GApps into a read-only Docker image is complex.
# The most robust way for "Stealth" is to mount GApps at runtime or use a specifically
# designed extraction script.
# For this 'Clean Forge', we will start with JUST Magisk to prove stability,
# then overlay GApps in the next step (Phase 3.1).
# Trying to do both at once is why the previous image failed.

# 4. Add "Stealth" Properties
# These properties help pass basic checks
RUN echo "ro.boot.verifiedbootstate=green" >> /system/build.prop
RUN echo "ro.boot.flash.locked=1" >> /system/build.prop
RUN echo "ro.boot.vbmeta.device_state=locked" >> /system/build.prop

# 5. Fix GPU Drivers for your RX 580 (Bake this in!)
# Prevents the black screen issues we fought earlier.
RUN echo "android.hardware.gralloc=gbm" >> /vendor/build.prop
RUN echo "ro.hardware.egl=mesa" >> /vendor/build.prop