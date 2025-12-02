import { Image } from "imagescript/mod.ts";

export async function GeneratePhotoThumbail(
  photoDirectory: string,
  photoFile: string,
): Promise<string> {
  const thumbnailDirectory = "assets/images/brendan/thumbnails";

  // Use async file read to avoid blocking the event loop
  const photoBinary = await Deno.readFile(`${photoDirectory}/${photoFile}`);
  const photoDecoded = await Image.decode(photoBinary);

  photoDecoded.resize(500, Image.RESIZE_AUTO);

  const thumbnailImageEncoded = await photoDecoded.encode();

  const cleanedFileName = photoFile.slice(0, -4).replaceAll(".", "");
  const thumbnailImagePath = `${thumbnailDirectory}/500_${cleanedFileName}.png`;

  // Use async file write to avoid blocking the event loop
  await Deno.writeFile(thumbnailImagePath, thumbnailImageEncoded);

  return thumbnailImagePath.replace("assets/", "/");
}
