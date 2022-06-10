#!/bin/bash

# Setup the message colour characters
blue="\033[0;34m"
red="\033[0;31m"
end="\033[0m"

# Exit if the version is not specified as a parameter
if [ $# -eq 0 ]; then
  echo -e "${red}Please specify a version in a format like: 2020.123${end}"
  exit 1
fi

echo "Running tests"
bash ${BASH_SOURCE%/*}/test.sh
if [ $? -ne 0 ]; then
  echo "Tests failed, aborting deploy"
  exit 1
fi

# Ask for confirmation from the user before continuing
read -p "Are you sure you want to create a new version ($1)? (y/n) " ANSWER
if [ "$ANSWER" != "y" ]; then
  echo -e "${red}Cancelled.${end}"
  exit 1
fi

echo -e "${blue}Updating the changelog...${end}"

printf "# Change Log\n\n- Version $1\n" > CHANGELOG.md
git log --oneline --format="- %s" --date=iso --no-merges >> CHANGELOG.md

echo -e "${blue}Committing the changes...${end}"

git add "CHANGELOG.md"
git commit -m "Version $1" --quiet
git tag $1

echo -e "${blue}Pushing the changes up...${end}"

git push --quiet
git push --tags --quiet

echo -e "${blue}The deployment process will now continue here: https://github.com/brendanmurty/murty-website/actions ${end}"
