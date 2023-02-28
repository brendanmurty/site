import {
  assertEquals,
  assertNotEquals
} from "https://deno.land/std@0.143.0/testing/asserts.ts";

Deno.test("bin/build", async (test) => {
  await test.step({
    name: "non-empty file 'public/index.html' was found",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile(
          "public/index.html"
        );

        assertNotEquals(publicIndexFileContents, "");
      } catch (_) {
        assertEquals("File not found", "");
      }
    }
  });

  await test.step({
    name: "non-empty file 'public/css/styles.min.css' was found",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile(
          "public/css/styles.min.css"
        );

        assertNotEquals(publicIndexFileContents, "");
      } catch (_) {
        assertEquals("File not found", "");
      }
    }
  });

  await test.step({
    name: "non-empty file 'public/brendan/index.html' was found",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile(
          "public/brendan/index.html"
        );

        assertNotEquals(publicIndexFileContents, "");
      } catch (_) {
        assertEquals("File not found", "");
      }
    }
  });

  await test.step({
    name: "non-empty file 'public/brendan/posts.json' was found",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile(
          "public/brendan/posts.json"
        );

        assertNotEquals(publicIndexFileContents, "");
      } catch (_) {
        assertEquals("File not found", "");
      }
    }
  });

  await test.step({
    name: "non-empty file 'public/images/brendan/brendan-murty-2021.jpeg' was found",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile(
          "public/images/brendan/brendan-murty-2021.jpeg"
        );

        assertNotEquals(publicIndexFileContents, "");
      } catch (_) {
        assertEquals("File not found", "");
      }
    }
  });
});
