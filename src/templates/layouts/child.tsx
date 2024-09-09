export default (
  { title, children, properties, url }: Lume.Data,
  helpers: Lume.Helpers
) => (
  <html lang="en-AU">
    <head>
      <meta charSet="utf-8" />
      <title>{title ? title : "Murty"}</title>
      <meta property="og:title" content={title ? title : "Murty"} />
      <meta name="description" content={properties.description} />
      <meta name="theme-color" content={properties.theme} />
      <meta name="author" content="Brendan Murty" />
      <meta name="handheldfriendly" content="true" />
      <meta name="mobileoptimized" content="480" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_GB" />
      <link rel="icon" sizes="192x192" href={properties.icon_192} />
      <link rel="stylesheet" href="/css/styles.min.css" />
      <script
        src="https://cdn.usefathom.com/script.js"
        data-site={properties.analytics ? properties.analytics : "CMUIENKH"}
        defer></script>
    </head>
    <body className={properties.body_class}>
      <section className="container">
        <header>
          <h1>{title}</h1>
        </header>

        <article>{children}</article>
      </section>
    </body>
  </html>
);