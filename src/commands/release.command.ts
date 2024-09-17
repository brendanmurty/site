// Release command - Run via "deno task release"

import { format } from "@std/datetime/format";

// Setup

const dateNow = new Date();
const nextVersion = format(dateNow, "yyyyMMdd.hhmm");

// Prompt for confirmation

const userConfirmed = confirm("Are you sure you want to create a new release (" + nextVersion + ")?");

if (!userConfirmed) {
  console.log("%cUser cancelled, release aborted.", "color: red");
  Deno.exit(0);
}

// Run tests

console.log("%cRunning tests", "color: blue");

const commandTest = new Deno.Command(Deno.execPath(), {
  args: ["run", "test"]
});

const { code } = commandTest.outputSync();

if (code !== 0) {
  console.log("%cTests failed, release aborted.", "color: red");

  Deno.exit(1);
}

console.log("%cTagging commit and pushing changes...", "color: blue");

new Deno.Command("git", { args: ["--git-dir=" + Deno.cwd(), "tag", nextVersion] });
new Deno.Command("git", { args: ["--git-dir=" + Deno.cwd(), "push", "--quiet"] });
new Deno.Command("git", { args: ["--git-dir=" + Deno.cwd(), "push", "--tags", "--quiet"] });

console.log("%cDone. A new GitHub Actions workflow should now remotely test and deploy these changes.", "color: green");
