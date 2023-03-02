import {
  Application,
  isHttpError
} from "https://deno.land/x/oak@v11.1.0/mod.ts";

const app = new Application();

app.use(async (context) => {
  try {
    // Redirects based on the domain requested by the visitor
    const request_domain: string =
      context.request.headers.get("host")?.split(":")[0] || "";
    switch (request_domain) {
      case "murty.io":
      case "murty.email":
      case "murty.social":
      case "www.murty.au":
      case "www.murty.io":
        context.response.redirect("https://murty.au/");
        break;
      case "b.murty.io":
      case "brendan.murty.io":
      case "b.murty.au":
      case "brendan.murty.au":
      case "brendanmurty.com":
        context.response.redirect("https://murty.au/brendan");
        break;
      case "upcomingtasks.com":
        context.response.redirect(
          "https://murty.au/brendan/posts/farewell-upcomingtasks/"
        );
        break;
      case "f.murty.io":
      case "freya.murty.io":
      case "f.murty.au":
      case "freya.murty.au":
      case "freyamurty.com":
        context.response.redirect("https://murty.au/freya");
        break;
      case "i.murty.io":
      case "isla.murty.io":
      case "i.murty.au":
      case "isla.murty.au":
      case "islamurty.com":
        context.response.redirect("https://murty.au/isla");
        break;
      case "l.murty.io":
      case "luca.murty.io":
      case "l.murty.au":
      case "luca.murty.au":
      case "lucamurty.com":
        context.response.redirect("https://murty.au/luca");
        break;
    }

    // Serve remaining valid requests from the static site directory
    await context.send({
      root: Deno.cwd() + "/public",
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
