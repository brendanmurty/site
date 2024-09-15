import { serveDir } from "@std/http/file-server";

console.log('%cServing "public" directory at http://localhost:8000', "color: green");

Deno.serve({ port: 8000 }, (request: Request) => {
  return serveDir(request, {
    fsRoot: "public"
  });
});
