/**
 * Lume Configuration
 *
 * This file defines how the Lume site build process works for this site.
 *
 * More information at https://lume.land/docs/configuration/config-file/
 */

import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import redirects from "lume/plugins/redirects.ts";
import sitemap from "lume/plugins/sitemap.ts";
import nunjucks from "lume/plugins/nunjucks.ts";
import jsx from "lume/plugins/jsx.ts";
import "@std/dotenv/load";

// Build the site using Lume
const site = lume({
  src: "./build",
  dest: "./public",
  prettyUrls: true
});

// Enable plugins
site.use(nunjucks());
site.use(date());
site.use(redirects());
site.use(sitemap());
site.use(jsx());

// Allow access to some site config values in TSX files
site.data("fathom_analytics_site_id", Deno.env.get("FATHOM_ANALYTICS_SITE_ID"));

export default site;
