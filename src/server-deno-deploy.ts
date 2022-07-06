import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";

const app = new Application();

app.use(async (ctx, next) => {
  try {
    await ctx.send({
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch {
    next();
  }
});
