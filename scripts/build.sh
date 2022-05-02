#!/bin/bash

# Figure out the right Deno binary to use
if [ "$(uname -s)" == "Linux" ]
then
  DENO_BIN="${BASH_SOURCE%/*}/../bin/linux/deno"
elif [ "$(uname -s)" == "Darwin" ]
then
  DENO_BIN="${BASH_SOURCE%/*}/../bin/macos/deno"
else
  DENO_BIN="${BASH_SOURCE%/*}/../bin/windows/deno.exe"
fi

echo "Clearing the 'public' directory"
rm -r public
mkdir -p public

echo "Clearing the 'building' directory and recreating subdirectories"
rm -r building
mkdir -p building
mkdir -p building/_data
mkdir -p public/brendan
cp -r assets building/_assets
cp -r styles building/_styles
cp -r templates building/_includes
cp -r content/* building

echo "Combining the CSS files"
mkdir -p building/_assets/css
cat building/_styles/_variables.css building/_styles/_common.css building/_styles/murty.css building/_styles/brendan.css building/_styles/isla.css building/_styles/freya.css building/_styles/luca.css > building/_assets/css/styles.css

echo "Minifying the combined CSS file"
rm minify.log
$DENO_BIN run -A --allow-read --allow-write https://deno.land/x/minifier/cli.ts building/_assets/css/styles.css building/_assets/css/styles.min.css > minify.log
rm building/_assets/css/styles.css

echo "Building the front-end using Lume and '_config.js'"
rm build.log
$DENO_BIN run -A https://deno.land/x/lume/ci.ts > build.log

echo "Building the JSON Feed for Brendan's posts"
$DENO_BIN run -A --allow-read --allow-write --allow-env src/json-feed.ts
