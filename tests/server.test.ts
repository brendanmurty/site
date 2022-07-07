import { assertEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
Deno.test("src/server.ts", async(test) => {

  await test.step({
    name: "valid HTTP response for 'http://127.0.0.1:8000/'",
    fn: async () => {
      const response = await fetch("http://127.0.0.1:8000/");

      await response.body?.cancel();

      assertEquals(
        response.status,
        200
      );
    }
  });

  await test.step({
    name: "valid HTTP response for 'http://127.0.0.1:8000/css/styles.min.css'",
    fn: async () => {
      const response = await fetch("http://127.0.0.1:8000/css/styles.min.css");

      await response.body?.cancel();

      assertEquals(
        response.status,
        200
      );
    }
  });

});
