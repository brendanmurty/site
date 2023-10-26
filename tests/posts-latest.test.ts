import { assertNotEquals } from "std/testing/asserts.ts";

import { PostsLatest } from "../src/posts-latest.ts";

Deno.test("src/posts-latest.ts", async (test) => {
  await test.step({
    name: "output contains suitable information about a post",
    fn: async () => {
      const returnedItem = await PostsLatest();

      assertNotEquals(returnedItem[0]["title"], "");
    }
  });
});
