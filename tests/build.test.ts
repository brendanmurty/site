import { assertEquals, assertNotEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";
import { exec } from "https://deno.land/x/exec@0.0.5/mod.ts";

Deno.test("scripts/build.sh", async(test) => {
  await test.step({
    name: "run script",
    fn: async () => {
      const command_output = await exec("bash scripts/build.sh > /dev/null 2>&1");

      assertNotEquals(command_output, "");
    }
  });

  // TODO: Add test - public directory is not empty

  // TODO: Add test - public directory has the required sub-directories and files

});
