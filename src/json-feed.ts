/**
* JSON Feed
* 
* Constructs JSON Feed data of Brendan's Posts and saves it to "brendan/posts.json".
*
* More information about JSON Feed is available here: https://jsonfeed.org/version/1.1
*
* After installing Deno, run this via the "build" script:
*    bash scripts/build.sh
*/

import { YamlData, JsonFeedData, JsonFeedAuthor, JsonFeedItem } from "./types.ts";
import { posix } from "https://deno.land/std/path/mod.ts";
import { parse, parseAll, stringify } from "https://deno.land/std/encoding/yaml.ts";

const postsDirectory: string = "building/brendan/posts";
const fileOutput: string = "public/brendan/posts.json";

const urlPosts: string = "https://murty.io/brendan/posts/";
const urlFeed: string = "https://murty.io/brendan/posts.json";

const jsonFeedVersion: string = "https://jsonfeed.org/version/1.1";
const jsonFeedTitle: string = "Posts by Brendan Murty";
const jsonFeedDescription: string = "Brendan is Software Engineer with varied commercial experience in web-based development, mentorship, training and project management";
const jsonFeedLanguage: string = "en-GB";
const jsonFeedAuthor: JsonFeedAuthor = { name: "Brendan Murty", url: "https://murty.io/brendan" };

const postsDirectoryAbsolute = posix.join(Deno.cwd(), postsDirectory);
const fileOutputAbsolute = posix.join(Deno.cwd(), fileOutput);

let jsonFeedItems: JsonFeedItem[] = [];

// Loop through all the files in the post directory
for await (const item of Deno.readDir(postsDirectoryAbsolute)) {
  // Check this item is a valid file
  if (item.isFile && item.name != "index.md" && item.name.slice(-3) == ".md") {
    // Extract general information from this file's name
    let postUrl: string = urlPosts + item.name.slice(0, -3) + "/";
    let postDate: string = item.name.slice(0, 4) + "-" + item.name.slice(4, 6) + "-" + item.name.slice(6, 8) + "T09:00:00.000Z";

    // Set a default title for this post
    let postTitle: string = "Post by Brendan Murty";

    // Attempt to extract the Post Title from the Markdown file's Frontmatter
    const postContent = Deno.readTextFileSync(posix.join(postsDirectoryAbsolute, item.name));
    
    if (postContent.startsWith("---") && postContent.charAt(3) !== "-") {
      const frontmatterEnd = postContent.indexOf("---", 3);

      if (frontmatterEnd !== -1) {
        let frontmatterData = parse(postContent.slice(3, frontmatterEnd)) as YamlData | undefined;
        
        if (frontmatterData) {
          postTitle = frontmatterData.title as string;
        }
      }
    }

    // Construct this post's item array
    let jsonFeedItem: JsonFeedItem = {
      id: postUrl,
      url: postUrl,
      title: postTitle,
      date_published: postDate,
      content_text: "Post by Brendan Murty, read more at " + postUrl
    };

    // Add this post's information to the JSON Feed items list
    jsonFeedItems.push(jsonFeedItem);

    // Order the items in the list by newest to oldest
    jsonFeedItems.sort((a, b) => -a.date_published.localeCompare(b.date_published));

    // Construct the JSON Feed contents
    let jsonFeed: JsonFeedData = {
      version: jsonFeedVersion,
      title: jsonFeedTitle,
      home_page_url: urlPosts,
      feed_url: urlFeed,
      description: jsonFeedDescription,
      author: jsonFeedAuthor,
      language: jsonFeedLanguage,
      items: jsonFeedItems
    };

    // Save the JSON Feed content to the required file
    let fileOutputWrite = Deno.writeTextFileSync(fileOutputAbsolute, JSON.stringify(jsonFeed));
    console.log('  - Post added to JSON Feed: ' + postTitle);
  }
}
