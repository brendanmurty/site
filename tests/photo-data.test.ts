import { assertEquals } from "@std/assert";
import { GetExifDataFromPhoto } from "../src/photo-data.ts";

Deno.test("src/photo-data.ts", async (test) => {
  await test.step({
    name: "exif data is returned for a photo with data",
    fn: async () => {
      const exifData = await GetExifDataFromPhoto(
        "./tests/assets",
        "test-photo.jpg"
      );

      assertEquals(exifData.photo_device, "Apple iPhone 8");
    }
  });
});
