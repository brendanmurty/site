import { join } from "std/path/mod.ts";
import { parse } from "std/yaml/mod.ts";

import { JsonFeedItem, YamlData } from "./types.ts";

// Loop through all the files in the post directory
// and return a structured array of their details
export async function PostsList(
  postsDirectoryAbsolute: string,
  postsUrl: string,
  postsDefaultTitle: string
): Promise<JsonFeedItem[]> {
  const postItems: JsonFeedItem[] = [];

  for await (const item of Deno.readDir(postsDirectoryAbsolute)) {
    // Check this item is a valid file
    if (
      item.isFile &&
      item.name != "index.md" &&
      item.name.slice(-3) == ".md"
    ) {
      // Extract general information from this file's name
      const postNoExtension: string = item.name.slice(0, -3);
      const postUrl: string = postsUrl + postNoExtension + "/";
      const postDate: string =
        item.name.slice(0, 4) +
        "-" +
        item.name.slice(4, 6) +
        "-" +
        item.name.slice(6, 8) +
        "T09:00:00.000Z";

      // Set a default title for this post
      let postTitle: string = postsDefaultTitle;

      // Attempt to extract the Post Title from the Markdown file's Frontmatter
      const postContent = Deno.readTextFileSync(
        join(postsDirectoryAbsolute, item.name)
      );

      if (postContent.startsWith("---") && postContent.charAt(3) !== "-") {
        const frontmatterEnd = postContent.indexOf("---", 3);

        if (frontmatterEnd !== -1) {
          const frontmatterData = parse(
            postContent.slice(3, frontmatterEnd)
          ) as YamlData | undefined;

          if (frontmatterData) {
            postTitle = frontmatterData.title as string;
          }
        }
      }

      // Construct this post's item array and ensure it meets the requirements
      // of the JsonFeedItem type so it can also be used in the JSON feed
      const postItem: JsonFeedItem = {
        id: postUrl,
        url: postUrl,
        title: postTitle,
        date_published: postDate,
        content_text: "Post by Brendan Murty, read more at " + postUrl
      };

      // Add this post's information to the return array
      postItems.push(postItem);

      // Order the items in the return array by newest to oldest
      postItems.sort(
        (a, b) => -a.date_published.localeCompare(b.date_published)
      );
    }
  }

  return postItems;
}
