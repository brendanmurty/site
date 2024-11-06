// Release command - Run via "deno task release"

import { format } from "@std/datetime/format";
import { runSync as exec } from "@gnome/exec";

// Setup

const dateNow = new Date();
const nextVersion = format(dateNow, "yyyyMMdd.HHmm");

// Prompt for confirmation

const userConfirmed = confirm(
  "Are you sure you want to create a new release (" + nextVersion + ")?",
);

if (!userConfirmed) {
  console.log("%cUser cancelled, release aborted.", "color: red");
  Deno.exit(0);
}

// Build site

console.log("%cBuilding site", "color: blue");

exec("deno", ["task", "build"]);

// Run tests

console.log("%cRunning tests", "color: blue");

exec("deno", ["task", "test"]);

console.log("%cTagging commit and pushing changes...", "color: blue");

exec("git", "tag " + nextVersion);
exec("git", "push --quiet");
exec("git", "push --tags --quiet");

console.log(
  "%cDone. A new GitHub Actions workflow should now remotely test and deploy these changes.",
  "color: green",
);
