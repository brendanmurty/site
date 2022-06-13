import { assertEquals, assertNotEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";

Deno.test("bin/build", async(test) => {

  await test.step({
    name: "public directory exists and is not empty",
    fn: async () => {
      try {
        const publicIndexFileContents: string = await Deno.readTextFile("public/index.html");

        assertNotEquals(
          publicIndexFileContents,
          ""
        );
      } catch (_) {
        assertEquals(
          "File not found",
          ""
        );
      }
      
    }
  });

  // TODO: Add test - public directory has the required sub-directories and files

});
