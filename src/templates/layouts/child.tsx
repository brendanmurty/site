export default (
  { title, children, properties }: Lume.Data,
  helpers: Lume.Helpers,
) => (
  <html lang="en-AU">
    <head>
      <meta charSet="utf-8" />
      <title>{title ? title : "Murty"}</title>
      <meta property="og:title" content={title ? title : "Murty"} />
      <meta name="description" content={properties.description} />
      <meta name="theme-color" content={properties.theme} />
      <link rel="icon" sizes="192x192" href={properties.icon_192} />
      <link rel="stylesheet" href="/css/styles.min.css" />
      <script
        src="https://cdn.usefathom.com/script.js"
        data-site="CMUIENKH"
        defer
      >
      </script>
    </head>
    <body className={properties.body_class}>
      <section className="container">
        <header>
          <h1>
            {title}
          </h1>
        </header>

        <article>
          {children}
        </article>
      </section>
    </body>
  </html>
);
