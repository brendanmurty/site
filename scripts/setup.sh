#!/bin/bash

# Install Lume
deno run -A https://deno.land/x/lume/install.ts

# Create some required untracked directories if they don't already exist
mkdir -p building
mkdir -p public

# Setup an initial ENV file if it doesn't already exist
cp -n .env.example .env

# Setup Git LFS and allow the local Deno binary to run on this machine
if [ "$(uname -s)" == "Linux" ]
then
  sudo apt install -y git git-lfs
  git-lfs install
  chmod +x ./bin/linux/deno
elif [ "$(uname -s)" == "Darwin" ]
then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  brew install git-lfs
  chmod +x ./bin/macos/deno
else
  git lfs install
fi

echo "Please edit '.env' to suit your environment."
