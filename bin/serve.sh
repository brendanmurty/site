# Serve

# Setup the message colour characters

blue="\033[0;34m"
yellow="\033[0;33m"
red="\033[0;31m"
end="\033[0m"

# Start the web server

echo -e "${blue}Server starting at http://localhost:8000/ ${end}"

deno run --allow-net --allow-read src/server.ts
