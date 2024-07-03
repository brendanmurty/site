// Convert the contents of ".env" in to YAML format and save it as "build/_data/site.yml".
// This allows for the Nunjucks templates to access these variables like this: {{ site.GOOGLE_ANALYTICS_SITE_CODE }}
const EnvFileContent = Deno.readTextFileSync("./.env");
const YmlFileContent = EnvFileContent.replaceAll("=", ": ");

// Save the YAML file so it can be accessed by the page templates
Deno.writeTextFileSync("./build/_data/site.yml", YmlFileContent);
