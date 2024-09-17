// Build command - Run via "deno task build"

import { copySync } from "@std/fs/copy";
import { emptyDirSync } from "@std/fs/empty-dir";
import { output, runSync as exec } from "@gnome/exec";
import { minify } from "minify";

// Define the temporary build directory (BUILD_DIR) and public output directory (PUBLIC_DIR)

const BUILD_DIR = "./build";
const PUBLIC_DIR = "./public";

// Setup

console.log("%cRecreating build directories", "color: yellow");

const buildDirectories = [
  BUILD_DIR,
  PUBLIC_DIR,
  BUILD_DIR + "/_data",
  BUILD_DIR + "/_assets",
  BUILD_DIR + "/_assets/css",
  PUBLIC_DIR + "/css",
  PUBLIC_DIR + "/brendan"
];

buildDirectories.forEach((buildDirectory) => {
  emptyDirSync(buildDirectory);
});

console.log("%cCopying over front-end code, static files and content", "color: yellow");

exec("cp", "-r content/* " + BUILD_DIR);
exec("cp", "-r src/styles " + BUILD_DIR + "/_styles");
exec("cp", "-r src/templates " + BUILD_DIR + "/_includes");
exec("cp", "-r src/layouts " + BUILD_DIR + "/_includes/layouts");

console.log("%cBuilding the front-end using Lume and '_config.ts'", "color: yellow");

exec("deno", "task lume");

console.log("%cCopying over static files", "color: yellow");

exec("cp", "-r assets/fonts " + PUBLIC_DIR + "/fonts");
exec("cp", "-r assets/images " + PUBLIC_DIR + "/images");
exec("cp", "assets/favicon.ico " + PUBLIC_DIR + "/favicon.ico");
exec("cp", "assets/config/robots.txt " + PUBLIC_DIR + "/robots.txt");
exec("cp", "assets/resume_public.pdf " + PUBLIC_DIR + "/Brendan Murty - Resume.pdf");

console.log("%cJoining CSS files", "color: yellow");

const cssJoin = await output("cat", [
  BUILD_DIR + "/_styles/tools-reset.css",
  BUILD_DIR + "/_styles/site.css",
  BUILD_DIR + "/_styles/media-screen-medium.css",
  BUILD_DIR + "/_styles/media-screen-small.css",
  BUILD_DIR + "/_styles/media-print.css"
]);

Deno.writeTextFileSync(BUILD_DIR + "/_assets/css/styles.css", cssJoin.text());

console.log("%cMinifying combined CSS file", "color: yellow");

const cssMinified = await minify(BUILD_DIR + "/_assets/css/styles.css");
exec("mkdir", PUBLIC_DIR + "/css");
Deno.writeTextFileSync(PUBLIC_DIR + "/css/styles.min.css", cssMinified);

console.log("%cBuilding photo posts for photos in 'inbox' directory", "color: yellow");

exec("deno", "run --allow-read --allow-write src/photo-posts-generate.ts");

console.log(
  "%cRemoving EXIF data from all files in the 'assets/images' directory",
  "color: yellow"
);

exec("exiftool", "-recurse -all= assets/images");
exec("exiftool", "-delete_original assets/images");

console.log("%cUpdating 'sitemap.xml' to use the production URL", "color: yellow");

const sitemapFile = PUBLIC_DIR + "/sitemap.xml";
const sitemapContents = Deno.readTextFileSync(sitemapFile);

Deno.writeTextFileSync(
  sitemapFile,
  sitemapContents.replaceAll("http://localhost/", "https://murty.au/")
);

console.log("%cConfiguring GitHub Pages", "color: yellow");

copySync("assets/redirect.html", PUBLIC_DIR + "/404.html");
copySync("assets/.nojekyll", PUBLIC_DIR + "/.nojekyll");
copySync("assets/config/CNAME", PUBLIC_DIR + "/CNAME");

console.log("%cBuilding the JSON Feed for Brendan's posts", "color: yellow");

exec("deno", "run --allow-read --allow-write --allow-env src/json-feed.ts");

console.log("%cBuild completed.", "color: green");
