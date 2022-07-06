import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";

const app = new Application();

app.use(async (ctx, next) => {
  try {
    // TODO: Setup redirects to handle shortcut redirects like b.murty.au ---> murty.au/brendan
    // const request_domain: string = ctx.request.headers.get('host')?.split(':')[0]);

    await ctx.send({
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch {
    next();
  }
});

const router = new Router();

// The /api/time endpoint returns the current time in ISO format.
router.get("/api/time", (ctx) => {
  ctx.response.body = { time: new Date().toISOString() };
});

// After creating the router, we can add it to the app.
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
