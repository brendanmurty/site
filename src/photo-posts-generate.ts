import { format } from "https://deno.land/std@0.173.0/datetime/mod.ts";

import { posix } from "https://deno.land/std@0.140.0/path/mod.ts";
import { GetExifDataFromPhoto } from "./photo-data.ts";

export async function GeneratePhotoPosts() {
  const inboxDirectory = posix.join(Deno.cwd(), 'inbox');
  const imagesDirectory = posix.join(Deno.cwd(), 'assets/images/brendan');
  const postsDirectory = posix.join(Deno.cwd(), 'content/brendan/posts');
  const photoItems: Record<string, string>[] = [];

  console.log(inboxDirectory);

  for await (const item of Deno.readDir(inboxDirectory)) {
    if (item.isFile && (item.name.slice(-4) == '.jpg' || item.name.slice(-5) == '.jpeg')) {
      
      const exifData = await GetExifDataFromPhoto(inboxDirectory, item.name);
      
      const dateToday: string = format(new Date(), 'yyyyMMdd');

      const imageFileName: string = dateToday + '_photo-' + item.name
        .slice(0, -4)
        .replaceAll('_', '')
        .replaceAll('-', '')
        .replaceAll(' ', '')
        .replaceAll('.', '')
        .toLowerCase() + 
        '.jpg';

      const postFileName: string = imageFileName.replace('.jpg', '.md');

      console.log("Generating photo post for '" + item.name + "' named '" + postFileName + "'");

      // TODO: create markdown file content
      // TODO: add photo exif data to a new 'photo' array in the front-matter block
      // TODO: move photo to 'imagesDirectory'
      // TODO: add image embed in markdown file
      // TODO: add "Photo" to tag array in the front-matter block
      // TODO: save markdown file content to 'postsDirectory' > 'postFileName'

      photoItems.push(exifData);

    }
  }

  // TODO: remove this line after this is finished
  console.log(photoItems);

  return photoItems;
}

// TODO: consider how to best handle the output from this script, does it need any?

// TODO: remove this line after this is finished
GeneratePhotoPosts();
