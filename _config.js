/**
* Lume Configuration
*
* This file defines how the Lume site build process works for this site.
* 
* More information at https://lume.land/docs/configuration/config-file/
*/

import lume from "https://deno.land/x/lume@v1.9.0/mod.ts";
import date from "https://deno.land/x/lume@v1.9.0/plugins/date.ts";

// Convert the contents of ".env" in to YAML format and save it as "building/_data/site.yml".
// This allows for the Nunjucks templates to access these variables like this: {{ site.FATHOM_ANALYTICS_SITE_CODE }}
const envFileContent = Deno.readTextFileSync("./.env");
const ymlFileContent = envFileContent.replaceAll("=", ": ");

Deno.writeTextFileSync("./building/_data/site.yml", ymlFileContent);
console.log("Updated 'building/_data/site.yml' using content from '.env'\n");

const site = lume({
  src: "./building",
  dest: "./public",
  prettyUrls: true,
  slugifyUrls: true
});

site.use(date());

export default site;
