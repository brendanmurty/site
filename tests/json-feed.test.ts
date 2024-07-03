import { load } from "std/dotenv/mod.ts";
import { assertEquals, assertNotEquals } from "std/assert/mod.ts";
import { isJSON } from "is_json/mod.ts";
import { join } from "std/path/mod.ts";

Deno.test("src/json-feed.ts", async (test) => {
  // Attempt to get the values of some variables from the ".env" file
  await load({ export: true });
  const postsJsonFile: string = Deno.env.get("JSON_FEED_FILE_OUTPUT") || "";
  const postsDirectory: string = Deno.env.get("BLOG_POSTS_DIR") || "";

  await test.step({
    name: "required var in env file is set (JSON_FEED_FILE_OUTPUT)",
    fn: () => {
      assertNotEquals(postsJsonFile, "");
    }
  });

  await test.step({
    name: "required var in env file is set (BLOG_POSTS_DIR)",
    fn: () => {
      assertNotEquals(postsDirectory, "");
    }
  });

  await test.step({
    name: "run json-feed script",
    fn: async () => {
      const jsonFeedCommand = Deno.run({
        cmd: [
          "deno",
          "run",
          "--allow-read",
          "--allow-write",
          "--allow-env",
          "src/json-feed.ts"
        ],
        stdout: "piped",
        stderr: "piped"
      });

      const { code } = await jsonFeedCommand.status();

      jsonFeedCommand.stdout.close();
      jsonFeedCommand.stderr.close();
      jsonFeedCommand.close();

      assertEquals(code, 0);
    }
  });

  await test.step({
    name: "post JSON file exists and is not empty",
    fn: async () => {
      const postsJsonContent: string = await Deno.readTextFile(postsJsonFile);

      assertNotEquals(postsJsonContent, "");
    }
  });

  await test.step({
    name: "post JSON content is valid",
    fn: async () => {
      const postsJsonContent: string = await Deno.readTextFile(postsJsonFile);

      assertEquals(isJSON(postsJsonContent), true);
    }
  });

  await test.step({
    name: "post JSON contains the right number of items",
    fn: async () => {
      const postsDirectoryAbsolute = join(Deno.cwd(), postsDirectory);

      const postsJsonContent: string = await Deno.readTextFile(postsJsonFile);
      const postsJsonObject = JSON.parse(postsJsonContent);
      const countItemsInJSONFile = Object.keys(postsJsonObject.items).length;

      let countValidPostFiles = 0;
      for await (const item of Deno.readDir(postsDirectoryAbsolute)) {
        if (
          item.isFile &&
          item.name != "index.md" &&
          item.name.slice(-3) == ".md"
        ) {
          countValidPostFiles++;
        }
      }

      assertEquals(countValidPostFiles, countItemsInJSONFile);
    }
  });
});
