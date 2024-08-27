# Deploy

# Setup the message colour characters

blue="\033[0;34m"
green="\033[0;32m"
yellow="\033[0;33m"
red="\033[0;31m"
end="\033[0m"

# Figure out the next version number

NEXT_VERSION=$(date +%Y%m%e.%H%M)

# Ask for confirmation from the user before continuing

read -p "$(echo -e $blue"Are you sure you want to create a new release ("$NEXT_VERSION")? (y/n) "$end)" ANSWER
if [ "$ANSWER" != "y" ]; then
  echo -e "${red}User cancelled, deploy aborted.${end}"
  exit 1
fi

# Run tests and exit if any tests fail

echo -e "${blue}Running tests${end}"

deno task test
if [ $? -ne 0 ]; then
  echo -e "${red}Tests failed, deploy aborted.${end}"
  exit 1
fi
deno task docker-stop

echo -e "${blue}Tagging commit and pushing changes...${end}"

git tag $NEXT_VERSION
git push --quiet
git push --tags --quiet

echo -e "${green}Done. A new GitHub Actions workflow should now remotely test and deploy these changes.${end}"
