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
  copySync("./assets/config/.env.example", ".env", { overwrite: false });
} catch (error) {
  if (error.name === "AlreadyExists") {
    console.log("%cSkipping ENV file setup, .env file already exists", "color: yellow");
  }
}

// Install Deno packages

new Deno.Command(Deno.execPath(), { args: ["run", "lume-install"] });

// Done, detail next steps

console.log("%cSetup completed", "color: green");
