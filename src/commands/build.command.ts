// Build command - Run via "deno task build"

// import { emptyDirSync } from "@std/fs/empty-dir";
// import { copySync } from "@std/fs/copy";

import { runSync as exec } from "@gnome/exec";

// Define the temporary build directory (BUILD_DIR) and public output directory (PUBLIC_DIR)

const BUILD_DIR = "build";
const PUBLIC_DIR = "public";

// Setup

console.log("%cRecreating build directories", "color: yellow");

exec("deno", "task setup");
Deno.mkdirSync(BUILD_DIR + "/_data");
Deno.mkdirSync(BUILD_DIR + "/_assets");
Deno.mkdirSync(BUILD_DIR + "/_assets/css");
Deno.mkdirSync(PUBLIC_DIR + "/css");
Deno.mkdirSync(PUBLIC_DIR + "/brendan");

console.log("%cRecreating build directories", "color: yellow");
