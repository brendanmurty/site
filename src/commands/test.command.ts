// Test command - Run via "deno task test"

// Run tests

console.log("%cRunning all tests", "color: yellow");

const commandTest = new Deno.Command(Deno.execPath(), {
  args: ["run", "test-run"]
});

const { code, stdout, stderr } = commandTest.outputSync();
console.log("code", code);
console.log("stdout", new TextDecoder().decode(stdout));
console.log("stderr", new TextDecoder().decode(stderr));

// Done, show final output line

console.log("%Done.", "color: green");
