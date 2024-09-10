import { Application } from "@oak/oak/application";

const app = new Application();

app.use(async (context) => {
  try {
    // Serve remaining valid requests from the static site directory
    await context.send({
      root: Deno.cwd() + "/public",
      index: "index.html"
    });
  } catch (error) {
    // Catch any errors and simplify the log message for them
    if (context.request?.url.href) {
      console.log("Error: " + error.message + " (" + context.request.url.href + ")");
    } else {
      console.log("Error: " + error.message);
    }

    // Redirect to the home page
    context.response.redirect("/");
  }
});

// Listen for visitor requests on port 8000
await app.listen({ port: 8000 });
