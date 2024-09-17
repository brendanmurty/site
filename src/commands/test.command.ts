// Test command - Run via "deno task test"

console.log("%cRunning all tests", "color: yellow");

const commandTest = new Deno.Command(Deno.execPath(), {
  args: ["run", "test-run"]
});

const { code, stdout } = commandTest.outputSync();

if (code === 0) {
  console.log("%cTests passed.", "color: green");
} else {
  console.log("%cTests failed, check output below.", "color: red");

  console.log(new TextDecoder().decode(stdout));

  Deno.exit(1);
}
