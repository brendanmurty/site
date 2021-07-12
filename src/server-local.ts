/** 
* HTTP Server
* 
* Returns static files from a local directory, defined in the ".env" file, based on web requests.
* 
* Run this via the "serve" script:
*    bash scripts/serve.sh
*/

import { Application, HttpError, Status } from "https://deno.land/x/oak/mod.ts";
import * as log from "https://deno.land/std/log/mod.ts";
import { FileHandler } from "https://deno.land/std/log/handlers.ts";
import "https://deno.land/x/dotenv/load.ts";

const webDirectory: string = Deno.env.get("WEB_DIRECTORY") || "./public";
const webIndex: string = Deno.env.get("WEB_INDEX") || "index.html";
const serverHostName: string = Deno.env.get("SERVER_HOSTNAME") || "127.0.0.1";
const serverPort: string = Deno.env.get("SERVER_PORT") || "8000";
const logFilePath: string = Deno.env.get("LOG_FILE") || "./server.log";

// Configure logging content to a file
await log.setup({
  handlers: {
    file: new log.handlers.FileHandler("INFO", {
      filename: logFilePath,
      formatter: "{datetime} {levelName} {msg}"
    })
  },
  loggers: {
    default: {
      level: "INFO",
      handlers: ["file"]
    }
  }
});

let log_file: any = log.getLogger();
const log_handler = <FileHandler> log_file.handlers[0];

// HTTPS requests are not supported by this script
if (serverPort == "443") {
  log_file.error('SERVER_PORT set to 443, not supported by local server.');
  log_handler.flush();

  console.log("\nERROR: HTTPS requests are not supported by this local server, please set the value of 'SERVER_PORT' in '.env' to another suitable number.");

  Deno.exit(1);
}

const app = new Application();

// Handle unsuccessful requests
app.use(async (context, next) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof HttpError) {
      log_file.error(context.request.method + " " + context.request.url.pathname + " ERROR " + String(e.status) + " " + e.message);
    } else if (e instanceof Error) {
      context.response.status = 500;

      log_file.critical(context.request.method + " " + context.request.url.pathname + " ERROR 500 Internal Server Error");

      log_file.critical(e.stack);
    }
    
    log_handler.flush();

    context.response.redirect("/");
  }
});

// Log successful requests
app.use(async (context, next) => {
  await next();
  const rt = context.response.headers.get("X-Response-Time");
  log_file.info(context.request.method + " " + context.request.url.pathname + " " + rt);
  log_handler.flush();
});

// Add response time info
app.use(async (context, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  context.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Send static content
app.use(async (context) => {
  await context.send({
    root: webDirectory,
    index: webIndex,
  });
});

// Log initial server starting events
app.addEventListener("listen", ({ hostname, port }) => {
  console.log("Server running on " + `${hostname}:${port}` + " - logging to " + logFilePath);

  log_file.info("Server running on " + `${hostname}:${port}`);
  log_handler.flush();
});

// Start the server for the defined hostname and port
await app.listen({ hostname: serverHostName, port: Number(serverPort) });
