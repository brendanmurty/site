import { serveDir } from "@std/http/file-server";

console.log('Serving "public" directory at http://localhost:8000');

Deno.serve({ port: 8000 }, (request: Request) => {
  return serveDir(request, {
    fsRoot: "public"
  });
});
