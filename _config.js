/**
* Lume Configuration
*
* This file defines how the Lume site build process works for this site.
* 
* More information at https://lumeland.github.io/getting-started/config-file/
*/

import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";

// Convert the contents of ".env" in to YAML format and save it as "building/_data/site.yml".
// This allows for the Nunjucks templates to access these variables like this: {{ site.EXAMPLE_VARIABLE }}
let envFileContent = Deno.readTextFileSync("./.env");
let ymlFileContent = envFileContent.replaceAll("=", ": ");
let ymlFileWrite = Deno.writeTextFileSync("./building/_data/site.yml", ymlFileContent);
console.log("Updated 'building/_data/site.yml' using content from '.env'\n");

const site = lume({
  src: "building",
  dest: "public",
  prettyUrls: true,
  slugifyUrls: false
});

site.use(date());

site.copy("_assets/css", "css");
site.copy("_assets/fonts", "fonts");
site.copy("_assets/images", "images");
site.copy("_assets/pdf", "pdf");
site.copy("_assets/svg", "svg");
site.copy("_assets/favicon.ico", "favicon.ico");
site.copy("_assets/robots.txt", "robots.txt");

export default site;
