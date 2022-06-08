#!/bin/bash

echo "Clearing the 'public' directory"
rm -r public
mkdir -p public

echo "Clearing the 'building' directory and recreating subdirectories"
rm -r building
mkdir -p building
mkdir -p building/_data
mkdir -p public/brendan
cp -r styles building/_styles
cp -r templates building/_includes
cp -r content/* building

echo "Combining the CSS files"
mkdir -p building/_assets/css
cat building/_styles/_variables.css building/_styles/_common.css building/_styles/murty.css building/_styles/brendan.css building/_styles/isla.css building/_styles/freya.css building/_styles/luca.css > building/_assets/css/styles.css

echo "Minifying the combined CSS file"
rm minify.log
deno run -A --allow-read --allow-write https://deno.land/x/minifier@v1.1.1/cli.ts building/_assets/css/styles.css building/_assets/css/styles.min.css > minify.log
rm building/_assets/css/styles.css

echo "Building the front-end using Lume and '_config.js'"
rm build.log
lume > build.log

echo "Copying static files to 'public' directory"
cp -r "assets/fonts" "public/fonts"
cp -r "assets/images" "public/images"
cp -r "assets/svg" "public/svg"
cp "assets/favicon.ico" "public/favicon.ico"
cp "assets/robots.txt" "public/robots.txt"
mkdir -p "public/css"
cp "building/_assets/css/styles.min.css" "public/css"

echo "Building the JSON Feed for Brendan's posts"
deno run -A --allow-read --allow-write --allow-env src/json-feed.ts
