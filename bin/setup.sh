# Setup

# Create some required untracked directories if they don't already exist

mkdir -p build
mkdir -p docs
mkdir -p inbox

# Create local untracked copies of third-party dependencies

rm -rf vendor
mkdir -p vendor
git clone --quiet --depth 1 git@github.com:brendanmurty/deno_exif.git vendor/deno-exif

# Install Deno packages

deno install --global --allow-run --allow-env --allow-read --name lume --force --reload https://deno.land/x/lume_cli/mod.ts
deno install --global --allow-read --allow-write --name minifier --force https://deno.land/x/minifier/cli.ts

# Setup an initial ENV file if it doesn't already exist

cp -n .env.example .env

# Done, detail next steps

echo ""
echo "Manual setup required:"
echo "1. Edit '.env' to suit this environment."
echo "2. Update your GitHub Pages configuration, details in README.md"
echo "3. Add Google Analytics site code to the 'GOOGLE_ANALYTICS_SITE_CODE' variable in '.env'"
echo "4. Install exiftool on your local machine - https://exiftool.org/"
