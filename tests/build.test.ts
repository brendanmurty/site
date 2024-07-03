import { assertEquals, assertNotEquals } from "std/assert/mod.ts";

Deno.test("build", async (test) => {
  await test.step({
    name: "non-empty file 'docs/index.html' was found",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile(
          "docs/index.html"
        );

        assertNotEquals(publicIndexFileContents, "");
      } catch (_) {
        assertEquals("File not found", "");
      }
    }
  });

  await test.step({
    name: "non-empty file 'docs/css/styles.css' was found",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile(
          "docs/css/styles.css"
        );

        assertNotEquals(publicIndexFileContents, "");
      } catch (_) {
        assertEquals("File not found", "");
      }
    }
  });

  await test.step({
    name: "non-empty file 'docs/brendan/index.html' was found",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile(
          "docs/brendan/index.html"
        );

        assertNotEquals(publicIndexFileContents, "");
      } catch (_) {
        assertEquals("File not found", "");
      }
    }
  });

  await test.step({
    name: "non-empty file 'docs/brendan/posts.json' was found",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile(
          "docs/brendan/posts.json"
        );

        assertNotEquals(publicIndexFileContents, "");
      } catch (_) {
        assertEquals("File not found", "");
      }
    }
  });

  await test.step({
    name: "non-empty file 'docs/images/brendan/brendan-luca-2023_200.jpg' was found",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile(
          "docs/images/brendan/brendan-luca-2023_200.jpg"
        );

        assertNotEquals(publicIndexFileContents, "");
      } catch (_) {
        assertEquals("File not found", "");
      }
    }
  });
});
