// New post command - Run via "deno task new-post"

import { format } from "@std/datetime/format";

const dateNow = new Date();
const postDateProperty = format(dateNow, "yyyy-MM-dd");
const postDateSlug = format(dateNow, "yyyyMMdd");

const postTitle = prompt("Title of the new post?");
const postSlug = prompt("URL slug for the new post?");

if (!postTitle || !postSlug) {
  console.log(
    "%cPost title and slug fields are required.",
    "color: red",
  );
} else {
  const postFile = "./content/posts/" + postDateSlug + "_" + postSlug + ".md";

  const postContentsArray: string[] = [
    "---",
    "title: " + postTitle,
    "date: " + postDateProperty,
    "url: /posts/" + postDateSlug + "_" + postSlug,
    "tags: ",
    "  - ",
    "---",
    "",
    "",
  ];

  const postContents = postContentsArray.join("\n");

  Deno.writeTextFileSync(postFile, postContents);

  console.log(
    "%cNew post file created at " + postFile,
    "color: green",
  );
}
