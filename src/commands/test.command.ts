// Test command - Run via "deno task test"

// Setup log file

const logFile = "test.log";

new Deno.Command("touch", { args: [logFile] });
new Deno.Command("rm", { args: ["-rf", logFile] });

// Run tests

console.log("%cRunning all tests", "color: yellow");

const commandTest = new Deno.Command(Deno.execPath(), {
  args: ["test", "--allow-run", "--allow-env", "--allow-read", "--allow-net", "src", "--quiet"],
  stdin: "piped",
  stdout: "piped"
});

const processTest = commandTest.spawn();
processTest.stdout.pipeTo(Deno.openSync(logFile, { write: true, create: true }).writable);
processTest.stdin.close();
const status = await processTest.status;

// Done, show final output line

if (status) {
  console.log("%cCompleted. Check '" + logFile + "' for more details", "color: green");
}
