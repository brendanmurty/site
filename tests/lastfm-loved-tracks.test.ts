import { assertNotEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { LastFmLovedTracks } from "../src/lastfm-loved-tracks.ts";

Deno.test("src/lastfm-loved-tracks.ts", async (test) => {
  const lastFmApiKey: string = Deno.env.get("LASTFM_API_KEY") || "";

  await test.step({
    name: "required var in env file is set (LASTFM_API_KEY)",
    fn: () => {
      assertNotEquals(lastFmApiKey, "");
    }
  });

  await test.step({
    name: "returns an array of items",
    fn: async () => {
      const lovedTracks = await LastFmLovedTracks();

      assertNotEquals(lovedTracks[0].track, "");
    }
  });
});
