const RedirectTemplate = "./assets/redirect.html";
const RedirectConfig = "./assets/redirects.json";
const OutputDirectoryPrefix = "./docs/";

// TODO: Consider using this instead of custom scripting: https://lume.land/plugins/redirects/

// TODO: Deno.readFile RedirectConfig and loop through each item
// TODO: Parse this and construct the from and to URLs
// TODO: Deno.readFile RedirectTemplate and replace "https://murty.au" with "https://murty.au/TO_URL"
// TODO: Generate new files in OutputDirectoryPrefix using the constructed FROM_URL, creating subdirectories as needed
