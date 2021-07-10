#!/bin/bash

# Create some required untracked directories if they don't already exist
mkdir -p building
mkdir -p public

# Setup an initial ENV file if it doesn't already exist
cp -n .env.example .env

echo "Please edit '.env' to suit your environment."
