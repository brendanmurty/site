import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import {
  assertEquals,
  assertNotEquals
} from "https://deno.land/std@0.143.0/testing/asserts.ts";
import { posix } from "https://deno.land/std@0.140.0/path/mod.ts";
import { PostsList } from "../src/posts-list.ts";

Deno.test("src/posts-list.ts", async (test) => {
  const postsDirectory: string = Deno.env.get("BLOG_POSTS_DIR") || "";
  const urlPosts: string = Deno.env.get("BLOG_POSTS_URL") || "";
  const jsonFeedDefaultPostTitle: string =
    Deno.env.get("JSON_FEED_DEFAULT_POST_TITLE") || "";

  await test.step({
    name: "required var in env file is set (BLOG_POSTS_DIR)",
    fn: () => {
      assertNotEquals(postsDirectory, "");
    }
  });

  await test.step({
    name: "required var in env file is set (BLOG_POSTS_URL)",
    fn: () => {
      assertNotEquals(urlPosts, "");
    }
  });

  await test.step({
    name: "required var in env file is set (JSON_FEED_DEFAULT_POST_TITLE)",
    fn: () => {
      assertNotEquals(jsonFeedDefaultPostTitle, "");
    }
  });

  await test.step({
    name: "output array contains the right number of items",
    fn: async () => {
      const postsDirectoryAbsolute = posix.join(Deno.cwd(), postsDirectory);

      const returnedItems = await PostsList(
        postsDirectoryAbsolute,
        urlPosts,
        jsonFeedDefaultPostTitle
      );
      const returnedItemsCount = returnedItems.length;

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

      assertEquals(countValidPostFiles, returnedItemsCount);
    }
  });
});
