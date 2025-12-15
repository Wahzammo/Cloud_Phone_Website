#!/bin/bash

# Z220 Farm Build Script
# Phase 3: Clean Forge

IMAGE_NAME="z220-farm:v1-magisk-core"

echo "[*] Starting Clean Build..."

# 1. Check for required files
if [ ! -f "Dockerfile" ]; then
    echo "[!] Error: Dockerfile not found!"
    exit 1
fi

# 2. Build the image
# We explicitly target x86_64 because the Z220 is an Intel machine.
# Redroid handles the ARM translation internally.
docker build --platform linux/amd64 -t $IMAGE_NAME .

if [ $? -eq 0 ]; then
    echo "[*] Build Success! Image tagged as: $IMAGE_NAME"
    echo "[*] You can now update your docker-compose.yml to use this image."
else
    echo "[!] Build Failed."
    exit 1
fi