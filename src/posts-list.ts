import { join } from "@std/path";
import { parse } from "@std/yaml";

import { JsonFeedItem, YamlData } from "./types.ts";

// Loop through all the files in the post directory
// and return a structured array of their details
export async function PostsList(
  postsDirectoryAbsolute: string,
  postsUrl: string,
  postsDefaultTitle: string,
): Promise<JsonFeedItem[]> {
  // First, collect all valid file entries
  const validFiles: Deno.DirEntry[] = [];
  for await (const item of Deno.readDir(postsDirectoryAbsolute)) {
    if (item.isFile && item.name !== "index.md" && item.name.endsWith(".md")) {
      validFiles.push(item);
    }
  }

  // Process all files in parallel for better performance
  const postItems = await Promise.all(
    validFiles.map((item) => processPostFile(item, postsDirectoryAbsolute, postsUrl, postsDefaultTitle)),
  );

  // Order the items in the return array by newest to oldest
  postItems.sort((a, b) => b.date_published.localeCompare(a.date_published));

  return postItems;
}

// Process a single post file and extract its metadata
async function processPostFile(
  item: Deno.DirEntry,
  postsDirectoryAbsolute: string,
  postsUrl: string,
  postsDefaultTitle: string,
): Promise<JsonFeedItem> {
  // Extract general information from this file's name
  const postNoExtension: string = item.name.slice(0, -3);
  const postUrl = `${postsUrl}${postNoExtension}/`;
  const postDate = `${item.name.slice(0, 4)}-${item.name.slice(4, 6)}-${item.name.slice(6, 8)}T09:00:00.000Z`;

  // Set a default title for this post
  let postTitle: string = postsDefaultTitle;

  // Attempt to extract the Post Title from the Markdown file's Frontmatter
  const postContent = await Deno.readTextFile(
    join(postsDirectoryAbsolute, item.name),
  );

  if (postContent.startsWith("---") && postContent.charAt(3) !== "-") {
    const frontmatterEnd = postContent.indexOf("---", 3);

    if (frontmatterEnd !== -1) {
      const frontmatterData = parse(postContent.slice(3, frontmatterEnd)) as
        | YamlData
        | undefined;

      if (frontmatterData && frontmatterData.title) {
        postTitle = frontmatterData.title as string;
      }
    }
  }

  return createPostItem(postUrl, postTitle, postDate);
}

// Construct this post's item array and ensure it meets the requirements
// of the JsonFeedItem type so it can also be used in the JSON feed
function createPostItem(postUrl: string, postTitle: string, postDate: string): JsonFeedItem {
  return {
    id: postUrl,
    url: postUrl,
    title: postTitle,
    date_published: postDate,
    content_text: `Post by Brendan Murty, read more at ${postUrl}`,
  };
}
