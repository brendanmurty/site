import { serveDir } from "@std/http/file-server";

Deno.serve((request: Request) => {
  return serveDir(request, {
    fsRoot: "public"
  });
});
