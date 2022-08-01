import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";

const app = new Application();

app.use(async (context, next) => {
  try {
    await next();
  } catch (error) {
    // Catch errors and simplify the log message for them
    console.log('Error: ' + error.message);
  }
});

app.use(async (context) => {
  // Redirect the user when a shortcut domain is requested
  const request_domain: string = context.request.headers.get('host')?.split(':')[0] || '';
  switch (request_domain) {
    case 'b.murty.io':
    case 'brendan.murty.io':
    case 'b.murty.au':
    case 'brendan.murty.au':
    case 'brendanmurty.com':
      context.response.redirect('https://murty.au/brendan');
      break;
    case 'upcomingtasks.com':
      context.response.redirect('https://murty.au/brendan/posts/farewell-upcomingtasks/');
      break;
    case 'f.murty.io':
    case 'freya.murty.io':
    case 'f.murty.au':
    case 'freya.murty.au':
    case 'freyamurty.com':
      context.response.redirect('https://murty.au/freya');
      break;
    case 'i.murty.io':
    case 'isla.murty.io':
    case 'i.murty.au':
    case 'isla.murty.au':
    case 'islamurty.com':
      context.response.redirect('https://murty.au/isla');
      break;
    case 'l.murty.io':
    case 'luca.murty.io':
    case 'l.murty.au':
    case 'luca.murty.au':
    case 'lucamurty.com':
      context.response.redirect('https://murty.au/luca');
      break;
  }

  // Serve the request from the static site directory
  await context.send({
    root: Deno.cwd() + '/public',
    index: 'index.html'
  });
});

// Listen for requests on port 8000
await app.listen({ port: 8000 });
