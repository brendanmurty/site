import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { assertEquals } from "https://deno.land/std@0.143.0/testing/asserts.ts";
import { GetExifDataFromPhoto } from "../src/photo-data.ts";

Deno.test("src/photo-data.ts", async(test) => {

  await test.step({
    name: "exif data is returned for a photo with data",
    fn: async () => {
      const exifData = await GetExifDataFromPhoto("./assets/images/brendan", "brendan-luca_750.jpg");

      assertEquals(
        exifData.device,
        "Apple iPhone 8"
      );
    }
  });

});
