// New post command - Run via "deno task new-post"

import { format } from "@std/datetime/format";

const dateNow = new Date();
const [postTitle, postSlug] = [
  prompt("Title of the new post?"),
  prompt("URL slug for the new post?"),
];

if (!postTitle || !postSlug) {
  console.log("%cPost title and slug fields are required.", "color: red");
} else {
  const dateSlug = format(dateNow, "yyyyMMdd");
  const postFile = `./content/posts/${dateSlug}_${postSlug}.md`;

  const postContents = [
    "---",
    `title: ${postTitle}`,
    `date: ${format(dateNow, "yyyy-MM-dd")}`,
    `url: /posts/${dateSlug}_${postSlug}`,
    "tags: ",
    "  - ",
    "---",
    "",
    "",
  ].join("\n");

  // Use async file write to avoid blocking
  await Deno.writeTextFile(postFile, postContents);
  console.log(`%cNew post file created at ${postFile}`, "color: green");
}
