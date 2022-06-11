import { assertEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";
import { existsSync } from "https://deno.land/std@0.143.0/fs/mod.ts";
import { isJSON } from "https://deno.land/x/deno_validator@v0.0.5/mod.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

// import { validate } from "https://deno.land/x/schema_validator@v0.0.3/mod.ts";
// import { YamlData, JsonFeedData, JsonFeedAuthor, JsonFeedItem } from "./types.ts";


Deno.test("src/json-feed.ts", async(test) => {
  await test.step({
    name: "run script",
    fn: async () => {
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

      assertEquals(
        code,
        0
      );
    }

  });

  await test.step({
    name: "post JSON file exists",
    fn: () => {
      const postsJsonFile: string = Deno.env.get("JSON_FEED_FILE_OUTPUT") || "public/brendan/posts.json";

      assertEquals(
        existsSync(postsJsonFile),
        true
      );
    }
  });

  await test.step({
    name: "post JSON content is valid",
    fn: async () => {
      const postsJsonFile: string = Deno.env.get("JSON_FEED_FILE_OUTPUT") || "public/brendan/posts.json";
      const postsJsonContent: string = await Deno.readTextFile(postsJsonFile);

      // TODO: Fix this check, as the JSON content is extracted properly here
      assertEquals(
        isJSON(postsJsonContent, ""),
        true
      );
    }
  });


  // TODO: Add test - each item in the "items" array in the JSON file matches the "JsonFeedItem" type definition

  // TODO: Add test - the main properties of the JSON file matches the "JsonFeedData" type definition

  // TODO: Add test - the "author" property of the JSON file matches the "JsonFeedAuthor" type definition

  // TODO: Add test - the "items" array in the JSON file contents contains the right number of items it it
  
});
