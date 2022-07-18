/**
* Lume Configuration
*
* This file defines how the Lume site build process works for this site.
* 
* More information at https://lume.land/docs/configuration/config-file/
*/

import lume from "https://deno.land/x/lume@v1.9.0/mod.ts";
import date from "https://deno.land/x/lume@v1.9.0/plugins/date.ts";

// Build the site using Lume
const site = lume({
  src: "./building",
  dest: "./public",
  prettyUrls: true,
  slugifyUrls: true
});

site.use(date());

export default site;
