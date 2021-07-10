#!/bin/bash

# Create some required untracked directories if they don't already exist
mkdir -p building
mkdir -p public

# Setup an initial ENV file if it doesn't already exist
cp -n .env.example .env

# Allow the local Deno binary to run on this machine
chmod +x ./scripts/bin/linux/deno
chmod +x ./scripts/bin/macos/deno

echo "Please edit '.env' to suit your environment."
