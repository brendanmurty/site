import {
  Application,
  isHttpError
} from "https://deno.land/x/oak@v12.1.0/mod.ts";

const app = new Application();

app.use(async (context) => {
  // Page redirects
  if (
    context.request.url.pathname.startsWith(
      "/brendan/posts/20230306_lead-software-engineer-at-boulevard"
    )
  ) {
    context.response.redirect(
      "/brendan/posts/20230306_lead-software-engineer-at-liquidise/"
    );
    return true;
  }

  try {
    // Serve remaining valid requests from the static site directory
    await context.send({
      root: Deno.cwd() + "/docs",
      index: "index.html"
    });
  } catch (error) {
    // Catch any errors and simplify the log message for them
    if (isHttpError(error)) {
      console.log(
        "Error: " + error.message + " (" + context.request.url.href + ")"
      );
    } else {
      console.log("Error: " + error.message);
    }

    // Redirect to the site listing page
    context.response.redirect("https://murty.au/");
  }
});

// Listen for visitor requests on port 8000
await app.listen({ port: 8000 });
