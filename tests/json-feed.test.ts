import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { assertEquals, assertNotEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
import { isJSON } from "https://deno.land/x/is_json@v1.0.2/mod.ts";
import { posix } from "https://deno.land/std@0.140.0/path/mod.ts";

Deno.test("src/json-feed.ts", async(test) => {

  const postsJsonFile: string = Deno.env.get("JSON_FEED_FILE_OUTPUT") || "";
  const postsDirectory: string = Deno.env.get("BLOG_POSTS_DIR") || "";

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
    name: "required var in env file is set (BLOG_POSTS_DIR)",
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
      const commandResponse = Deno.run({
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

      const { code } = await commandResponse.status();

      commandResponse.stdout.close();
      commandResponse.stderr.close();
      commandResponse.close();

      assertEquals(
        code,
        0
      );
    }
  });

  await test.step({
    name: "post JSON file exists and is not empty",
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
  
});
