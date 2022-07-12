import { assertNotEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { LastFmLovedTracks } from "../src/lastfm-loved-tracks.ts";

Deno.test("src/lastfm-loved-tracks.ts", async(test) => {

  await test.step({
    name: "returns an array of items",
    fn: async () => {
      const lovedTracks = await LastFmLovedTracks();

      assertNotEquals(
        lovedTracks[0].track,
        ""
      );
    }
  });

});
