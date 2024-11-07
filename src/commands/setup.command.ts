// Setup command - Run via "deno task setup"

import { emptyDirSync } from "@std/fs/empty-dir";
import { copySync } from "@std/fs/copy";
import { runSync as exec } from "@gnome/exec";

// Recreate some required untracked directories

const buildDirectories = ["./build", "./inbox", "./public"];

buildDirectories.forEach((buildDirectory) => {
  emptyDirSync(buildDirectory);
});

// Setup an initial ENV file if it doesn't already exist

try {
  copySync("./config/.env.example", ".env", { overwrite: false });
  // deno-lint-ignore no-explicit-any
} catch (error: any) {
  if (error.name === "AlreadyExists") {
    console.log(
      "%cSkipping ENV file setup, .env file already exists",
      "color: yellow",
    );
  }
}

// Install Lume packages

exec("deno", ["task", "lume-install"]);
exec("deno", ["task", "lume-cli-upgrade"]);

// Done, detail next steps

console.log("%cSetup completed", "color: green");
