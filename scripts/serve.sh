#!/bin/bash

# Build the site and front-end assets first
bash ${BASH_SOURCE%/*}/build.sh

# Start the local web server
deno run --allow-net --allow-read --allow-write --allow-env src/server-local.ts
