import { json2yaml } from "json2yaml/mod.ts";

import { LastFmLovedTracks } from "./lastfm-loved-tracks.ts";

// Convert the contents of ".env" in to YAML format and save it as "build/_data/site.yml".
// This allows for the Nunjucks templates to access these variables like this: {{ site.GOOGLE_ANALYTICS_SITE_CODE }}
const EnvFileContent = Deno.readTextFileSync("./.env");
let YmlFileContent = EnvFileContent.replaceAll("=", ": ");

// Add the Last.fm loved tracks to the site data
const LastfmLovedTracks = await LastFmLovedTracks();
const DataLastfmLovedTracks =
  '{ "LASTFM_LOVED_TRACKS": ' + JSON.stringify(LastfmLovedTracks) + "}";
YmlFileContent += "\r" + json2yaml(DataLastfmLovedTracks);

// Save the YAML file so it can be accessed by the page templates
Deno.writeTextFileSync("./build/_data/site.yml", YmlFileContent);
