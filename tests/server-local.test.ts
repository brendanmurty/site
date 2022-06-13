// import { assertEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";

// Deno.test("src/server-local.ts", async(test) => {
//   await test.step({
//     name: "run script",
//     fn: async () => {
//       // TODO: Update this to run in the background while the tests are running
//       const script_run = Deno.run({
//         cmd: [
//           "deno",
//           "run",
//           "--allow-read",
//           "--allow-net",
//           "--allow-write",
//           "--allow-env",
//           "src/server-local.ts"
//         ],
//         stdout: "piped",
//         stderr: "piped",
//       });

//       const { code } = await script_run.status();

//       script_run.stdout.close();
//       script_run.stderr.close();
//       script_run.close();

//       assertEquals(code, 0);
//     }

//   });

//   // TODO: Add test - server has started

//   // TODO: Add test - a ping to the localhost domain returns a valid status code
  
//   // TODO: Kill the background "script_run" process when all tests have been completed

// });
