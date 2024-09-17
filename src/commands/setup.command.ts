// Setup command - Run via "deno task setup"

import { emptyDirSync } from "@std/fs/empty-dir";
import { copySync } from "@std/fs/copy";

// Recreate some required untracked directories

const buildDirectories = ["./build", "./inbox", "./public"];

buildDirectories.forEach((buildDirectory) => {
  emptyDirSync(buildDirectory);
});

// Setup an initial ENV file if it doesn't already exist

try {
  copySync(".env.example", ".env", { overwrite: false });
} catch (error) {
  if (error.name === "AlreadyExists") {
    console.log("%cSkipping ENV file setup, .env file already exists", "color: yellow");
  }
}

// Install Deno packages

new Deno.Command(Deno.execPath(), { args: ["run", "lume-install"] });

// Done, detail next steps

console.log("%cManual setup required", "color: blue");
console.log("1. Edit '.env' to suit this environment.");
console.log("2. Update your GitHub Pages configuration, details in README.md");
console.log("3. Add your Fathom Analytics site ID to the 'FATHOM_ANALYTICS_SITE_ID' variable in '.env'");
console.log("4. Install exiftool on your local machine - https://exiftool.org/");
