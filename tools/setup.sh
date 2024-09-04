# Setup

# Create some required untracked directories if they don't already exist

mkdir -p build
mkdir -p public
mkdir -p inbox

# Install Deno packages

deno install --global --allow-run --allow-env --allow-read --name lume --force --reload https://deno.land/x/lume_cli/mod.ts

# Setup an initial ENV file if it doesn't already exist

cp -n .env.example .env

# Done, detail next steps

echo ""
echo "Manual setup required:"
echo "1. Edit '.env' to suit this environment."
echo "2. Update your GitHub Pages configuration, details in README.md"
echo "3. Add your Fathom Analytics site ID to the 'FATHOM_ANALYTICS_SITE_ID' variable in '.env'"
echo "4. Install exiftool on your local machine - https://exiftool.org/"
