#!/bin/bash

# Build the site and front-end assets first
bash ${BASH_SOURCE%/*}/build.sh

# Figure out the right Deno binary to use
if [ "$(uname -s)" == "Linux" ]
then
  DENO_BIN="${BASH_SOURCE%/*}/bin/linux/deno"
elif [ "$(uname -s)" == "Darwin" ]
then
  DENO_BIN="${BASH_SOURCE%/*}/bin/macos/deno"
else
  DENO_BIN="${BASH_SOURCE%/*}/bin/windows/deno"
fi

# Start the local web server
$DENO_BIN run --allow-net --allow-read --allow-write --allow-env src/server-local.ts
