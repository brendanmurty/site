import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { assertEquals, assertNotEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";
import { existsSync } from "https://deno.land/std@0.143.0/fs/mod.ts";
import { isJSON } from "https://deno.land/x/is_json@v1.0.2/mod.ts";
import { posix } from "https://deno.land/std@0.140.0/path/mod.ts";
import { YamlData, JsonFeedData, JsonFeedAuthor, JsonFeedItem } from "../src/types.ts";

Deno.test("src/json-feed.ts", async(test) => {
  const postsJsonFile: string = Deno.env.get("JSON_FEED_FILE_OUTPUT") || "";
  const postsDirectory: string = Deno.env.get("JSON_FEED_POSTS_DIR") || "";

  await test.step({
    name: "required var in env file is set (JSON_FEED_FILE_OUTPUT)",
    fn: () => {
      assertNotEquals(
        postsJsonFile,
        ""
      );
    }
  });

  await test.step({
    name: "required var in env file is set (JSON_FEED_POSTS_DIR)",
    fn: () => {
      assertNotEquals(
        postsDirectory,
        ""
      );
    }
  });

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
      assertEquals(
        existsSync(postsJsonFile),
        true
      );
    }
  });

  await test.step({
    name: "post JSON file has contents",
    fn: async () => {
      const postsJsonContent: string = await Deno.readTextFile(postsJsonFile);

      assertNotEquals(
        postsJsonContent,
        ""
      );
    }
  });

  await test.step({
    name: "post JSON content is valid",
    fn: async () => {
      const postsJsonContent: string = await Deno.readTextFile(postsJsonFile);

      assertEquals(
        isJSON(postsJsonContent),
        true
      );
    }
  });

  await test.step({
    name: "post JSON contains the right number of items",
    fn: async () => {
      const postsDirectoryAbsolute = posix.join(Deno.cwd(), postsDirectory);

      const postsJsonContent: string = await Deno.readTextFile(postsJsonFile);
      const postsJsonObject = JSON.parse(postsJsonContent);
      const countItemsInJSONFile = Object.keys(postsJsonObject.items).length;

      let countValidPostFiles = 0;
      for await (const item of Deno.readDir(postsDirectoryAbsolute)) {
        if (item.isFile && item.name != "index.md" && item.name.slice(-3) == ".md") {
          countValidPostFiles++;
        }
      }

      assertEquals(
        countValidPostFiles,
        countItemsInJSONFile
      );
    }
  });

  // TODO: Add test - each item in the "items" array in the JSON file matches the "JsonFeedItem" type definition

  // TODO: Add test - the main properties of the JSON file matches the "JsonFeedData" type definition

  // TODO: Add test - the "author" property of the JSON file matches the "JsonFeedAuthor" type definition

  
});
