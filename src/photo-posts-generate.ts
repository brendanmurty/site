import { format } from "https://deno.land/std@0.173.0/datetime/mod.ts";
import { posix } from "https://deno.land/std@0.140.0/path/mod.ts";
import { json2yaml } from "https://deno.land/x/json2yaml@v1.0.1/mod.ts";
import { GetExifDataFromPhoto } from "./photo-data.ts";
import { GeneratePhotoThumbail } from "./photo-thumbnail-generate.ts";

export async function GeneratePhotoPosts(): Promise<void> {
  const inboxDirectory = "inbox";
  const imagesDirectory = "assets/images/brendan";
  const postsDirectory = "content/brendan/posts";

  for await (const item of Deno.readDir(
    posix.join(Deno.cwd(), inboxDirectory)
  )) {
    if (
      item.isFile &&
      (item.name.toLowerCase().slice(-4) == ".jpg" ||
        item.name.toLowerCase().slice(-5) == ".jpeg")
    ) {
      // A JPG photo file was found, start processing it
      const dateFile: string = format(new Date(), "yyyyMMdd");
      const dateMeta: string = format(new Date(), "yyyy-MM-dd");
      const imageFileName: string =
        dateFile +
        "_photo-" +
        item.name
          .slice(0, -4)
          .replaceAll("_", "")
          .replaceAll("-", "")
          .replaceAll(" ", "")
          .replaceAll(".", "")
          .toLowerCase() +
        ".jpg";
      const postFileName: string = imageFileName.replace(".jpg", ".md");
      const photoUrl: string = "/images/brendan/" + imageFileName;

      console.log(
        "Generating photo post for '" +
          item.name +
          "' named '" +
          postFileName +
          "'"
      );

      // Extract and process the EXIF data from the photo
      const exifData = await GetExifDataFromPhoto(inboxDirectory, item.name);

      // Generate and save a smaller thumbnail version of this photo
      const thumbnailImageUrl = await GeneratePhotoThumbail(
        inboxDirectory,
        item.name
      );

      const markdownContent =
        "---" +
        "\r" +
        "title: Photo - " +
        dateFile +
        "\r" +
        "date: " +
        dateMeta +
        "\r" +
        "tags: " +
        "\r" +
        "  - Photo" +
        "\r" +
        json2yaml(JSON.stringify(exifData)) +
        "photo_file: " +
        imageFileName +
        "\r" +
        "photo_url: " +
        photoUrl +
        "\r" +
        "photo_thumb_url: " +
        thumbnailImageUrl +
        "\r" +
        "---" +
        "\r" +
        "" +
        "\r" +
        "![](/images/brendan/" +
        imageFileName +
        ")" +
        "\r";

      Deno.writeTextFileSync(
        posix.join(Deno.cwd(), postsDirectory, postFileName),
        markdownContent
      );

      Deno.renameSync(
        posix.join(Deno.cwd(), inboxDirectory, item.name),
        posix.join(Deno.cwd(), imagesDirectory, imageFileName)
      );
    }
  }
}

await GeneratePhotoPosts();
