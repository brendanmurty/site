import { assertEquals, assertNotEquals } from "@std/assert";
import { join } from "@std/path";
import { load } from "@std/dotenv";
import { searchPosts, SearchResult } from "./search.ts";

Deno.test("src/search.ts", async (test) => {
  await load({ export: true });

  const postsDirectory: string = Deno.env.get("BLOG_POSTS_DIR") || "";
  const urlPosts: string = Deno.env.get("BLOG_POSTS_URL") || "";

  await test.step({
    name: "required var in env file is set (BLOG_POSTS_DIR)",
    fn: () => {
      assertNotEquals(postsDirectory, "");
    },
  });

  await test.step({
    name: "required var in env file is set (BLOG_POSTS_URL)",
    fn: () => {
      assertNotEquals(urlPosts, "");
    },
  });

  await test.step({
    name: "returns empty array for empty query",
    fn: async () => {
      const postsDirectoryAbsolute = join(Deno.cwd(), postsDirectory);
      const results = await searchPosts(postsDirectoryAbsolute, urlPosts, "");
      assertEquals(results.length, 0);
    },
  });

  await test.step({
    name: "returns empty array for whitespace-only query",
    fn: async () => {
      const postsDirectoryAbsolute = join(Deno.cwd(), postsDirectory);
      const results = await searchPosts(postsDirectoryAbsolute, urlPosts, "   ");
      assertEquals(results.length, 0);
    },
  });

  await test.step({
    name: "finds posts matching query in title",
    fn: async () => {
      const postsDirectoryAbsolute = join(Deno.cwd(), postsDirectory);
      const results = await searchPosts(postsDirectoryAbsolute, urlPosts, "Career");
      // Should find posts with "Career" in title or content
      assertNotEquals(results.length, 0);
    },
  });

  await test.step({
    name: "search is case-insensitive",
    fn: async () => {
      const postsDirectoryAbsolute = join(Deno.cwd(), postsDirectory);
      const resultsLower = await searchPosts(postsDirectoryAbsolute, urlPosts, "developer");
      const resultsUpper = await searchPosts(postsDirectoryAbsolute, urlPosts, "DEVELOPER");
      assertEquals(resultsLower.length, resultsUpper.length);
    },
  });

  await test.step({
    name: "search results contain required fields",
    fn: async () => {
      const postsDirectoryAbsolute = join(Deno.cwd(), postsDirectory);
      const results = await searchPosts(postsDirectoryAbsolute, urlPosts, "the");

      if (results.length > 0) {
        const result: SearchResult = results[0];
        assertNotEquals(result.url, "");
        assertNotEquals(result.date, "");
        // title might be empty if not set in frontmatter
        assertEquals(typeof result.title, "string");
      }
    },
  });

  await test.step({
    name: "results are sorted by date (newest first)",
    fn: async () => {
      const postsDirectoryAbsolute = join(Deno.cwd(), postsDirectory);
      const results = await searchPosts(postsDirectoryAbsolute, urlPosts, "the");

      if (results.length > 1) {
        for (let i = 0; i < results.length - 1; i++) {
          const currentDate = results[i].date;
          const nextDate = results[i + 1].date;
          assertEquals(currentDate >= nextDate, true);
        }
      }
    },
  });

  await test.step({
    name: "returns empty array for non-matching query",
    fn: async () => {
      const postsDirectoryAbsolute = join(Deno.cwd(), postsDirectory);
      const results = await searchPosts(postsDirectoryAbsolute, urlPosts, "xyznonexistentquery123");
      assertEquals(results.length, 0);
    },
  });
});
