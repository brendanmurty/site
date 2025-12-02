import { format } from "@std/datetime";
import { join } from "@std/path";
import { json2yaml } from "json2yaml/mod.ts";

import { GetExifDataFromPhoto } from "./photo-data.ts";
import { GeneratePhotoThumbail } from "./photo-thumbnail-generate.ts";

export async function GeneratePhotoPosts(): Promise<void> {
  const inboxDirectory = "inbox";
  const imagesDirectory = "assets/images/brendan";
  const postsDirectory = "content/posts";

  for await (const item of Deno.readDir(join(Deno.cwd(), inboxDirectory))) {
    // Store lowercase name to avoid redundant string transformations
    const fileNameLower = item.name.toLowerCase();
    if (
      item.isFile &&
      (fileNameLower.endsWith(".jpg") || fileNameLower.endsWith(".jpeg"))
    ) {
      // A JPG photo file was found, start processing it
      const dateFile: string = format(new Date(), "yyyyMMdd");
      const dateMeta: string = format(new Date(), "yyyy-MM-dd");
      const cleanedName = item.name.slice(0, -4).replaceAll("_", "").replaceAll("-", "")
        .replaceAll(" ", "").replaceAll(".", "").toLowerCase();
      const imageFileName = `${dateFile}_photo-${cleanedName}.jpg`;
      const postFileName: string = imageFileName.replace(".jpg", ".md");
      const photoUrl = `/images/brendan/${imageFileName}`;

      console.log(`Generating photo post for '${item.name}' named '${postFileName}'`);

      // Extract and process the EXIF data from the photo (now async)
      const exifData = await GetExifDataFromPhoto(inboxDirectory, item.name);

      // Generate and save a smaller thumbnail version of this photo
      const thumbnailImageUrl = await GeneratePhotoThumbail(
        inboxDirectory,
        item.name,
      );

      // Build markdown content using array join for better readability
      // json2yaml adds trailing newline, so we use it directly without array for that section
      const exifYaml = json2yaml(JSON.stringify(exifData));
      const markdownContent = [
        "---",
        `title: Photo - ${dateFile}`,
        `date: ${dateMeta}`,
        "tags: ",
        "  - Photo",
      ].join("\r") + "\r" + exifYaml + [
        `photo_file: ${imageFileName}`,
        `photo_url: ${photoUrl}`,
        `photo_thumb_url: ${thumbnailImageUrl}`,
        "---",
        "",
        `![](/images/brendan/${imageFileName})`,
        "",
      ].join("\r");

      // Use async file operations to avoid blocking the event loop
      await Deno.writeTextFile(
        join(Deno.cwd(), postsDirectory, postFileName),
        markdownContent,
      );

      await Deno.rename(
        join(Deno.cwd(), inboxDirectory, item.name),
        join(Deno.cwd(), imagesDirectory, imageFileName),
      );
    }
  }
}

await GeneratePhotoPosts();
