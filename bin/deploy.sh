# Deploy

# Setup the message colour characters

blue="\033[0;34m"
green="\033[0;32m"
yellow="\033[0;33m"
red="\033[0;31m"
end="\033[0m"

# Exit if the version is not specified as a parameter

if [ $# -eq 0 ]; then
  echo -e "${red}Please specify a version in a format like: 2020.123${end}"
  exit 1
fi

# Ask for confirmation from the user before continuing

read -p "$(echo -e $blue"Are you sure you want to create a new version ("$1")? (y/n) "$end)" ANSWER
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

echo -e "${blue}Building site...${end}"
deno task build

echo -e "${blue}Updating the changelog...${end}"

printf "# Change Log\n\n- Version $1\n" > CHANGELOG.md
git log --oneline --format="- [%s](https://github.com/brendanmurty/murty-website/commit/%h)" --no-merges >> CHANGELOG.md

echo -e "${blue}Committing the changes...${end}"

git add docs/*
git add CHANGELOG.md
git commit -m "Version $1" --quiet
git tag $1

echo -e "${blue}Pushing the changes up...${end}"

git push --quiet
git push --tags --quiet

echo -e "${green}Done. GitHub Pages should now deploy changes to the site.${end}"
