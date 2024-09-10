// Convert the contents of ".env" in to YAML format and save it as "build/_data/site.yml".
//  - Adds support to Nunjucks templates to access these variables like this: {{ site.FATHOM_ANALYTICS_SITE_ID }}
//  - To access these in TSX templates, a "site.data" call is needed in "_config.ts"
const EnvFileContent = Deno.readTextFileSync("./.env");
const YmlFileContent = EnvFileContent.replaceAll("=", ": ");

// Save the YAML file so it can be accessed by the page templates
Deno.writeTextFileSync("./build/_data/site.yml", YmlFileContent);
