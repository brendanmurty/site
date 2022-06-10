import { assertEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";

// import { validate } from "https://deno.land/x/schema_validator@v0.0.3/mod.ts";
// import { YamlData, JsonFeedData, JsonFeedAuthor, JsonFeedItem } from "./types.ts";

Deno.test("src/json-feed.ts", async(test) => {
  await test.step({
    name: "run script",
    fn: async () => {
      // Setup:
      //  - Run the "src/json-feed.ts" script
      //  - Wait for the output
      //  - Continue to the tests if no errors were triggered

      const script_run = Deno.run({
        cmd: [
          "deno",
          "run",
          "--allow-read",
          "--allow-write",
          "--allow-env",
          "src/json-feed.ts"
        ],
        stdout: "piped",
        stderr: "piped",
      });

      const { code } = await script_run.status();

      script_run.stdout.close();
      script_run.stderr.close();
      script_run.close();

      assertEquals(code, 0);
    }

  });

  // TODO: Add test - a JSON file is saved at the path specified in the JSON_FEED_FILE_OUTPUT var in the ENV file

  // TODO: Add test - the contents of the JSON file is valid JSON overall

  // TODO: Add test - each item in the "items" array in the JSON file matches the "JsonFeedItem" type definition

  // TODO: Add test - the main properties of the JSON file matches the "JsonFeedData" type definition

  // TODO: Add test - the "author" property of the JSON file matches the "JsonFeedAuthor" type definition

  // TODO: Add test - the "items" array in the JSON file contents contains the right number of items it it
  
});
