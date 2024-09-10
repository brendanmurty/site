export default ({ title, children, properties, url, photo_thumb_url, photo_url, FATHOM_ANALYTICS_SITE_ID }: Lume.Data) => (
  <html lang="en-AU">
    <head>
      <title>{title ? "Brendan Murty - " + title : "Brendan Murty"}</title>

      <meta charSet="utf-8" />
      <meta name="handheldfriendly" content="true" />
      <meta name="mobileoptimized" content="480" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Brendan Murty" />
      <meta
        name="description"
        content={properties.description ? properties.description : "Brendan is a Father, Schnitzel Reviewer, Software Engineering Manager and Technical Lead."}
      />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:title" content={title ? "Brendan Murty - " + title : "Brendan Murty"} />
      <meta property="og:url" content={"https://murty.au" + url} />
      <meta
        name="og:description"
        content={properties.description ? properties.description : "Brendan is a Father, Schnitzel Reviewer, Software Engineering Manager and Technical Lead."}
      />

      {photo_thumb_url ? (
        <meta property="og:image" content={"https://murty.au" + photo_thumb_url} />
      ) : photo_url ? (
        <meta property="og:image" content={"https://murty.au" + photo_url} />
      ) : (
        <meta property="og:image" content="https://murty.au/images/brendan/brendan-2024_750.png" />
      )}

      <meta name="theme-color" content={properties.theme ? properties.theme : "#23c5b0"} />

      <link rel="me" href="https://mastodon.social/@murty" />
      <link rel="icon" sizes="192x192" href={properties.icon_192 ? properties.icon_192 : "/images/brendan/icon-192.png"} />

      <link rel="preload" href="/fonts/MDIO-Black.woff" as="font" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/MDIO-Regular.woff" as="font" crossOrigin="anonymous" />
      <link rel="preload" href="/css/styles.min.css" as="style" />
      <link rel="preload" href="/css/fontawesome/css/fontawesome.min.css" as="style" />
      <link rel="preload" href="/css/fontawesome/css/solid.min.css" as="style" />
      <link rel="preload" href="/css/fontawesome/css/brands.min.css" as="style" />

      <link rel="stylesheet" href="/css/styles.min.css" />
      <link rel="stylesheet" href="/css/fontawesome/css/fontawesome.min.css" />
      <link rel="stylesheet" href="/css/fontawesome/css/solid.min.css" />
      <link rel="stylesheet" href="/css/fontawesome/css/brands.min.css" />

      <link rel="alternate" title="Posts by Brendan Murty" type="application/json" href="https://murty.au/brendan/posts.json"></link>

      <script defer src="https://cdn.usefathom.com/script.js" data-site={FATHOM_ANALYTICS_SITE_ID}></script>
    </head>
    <body className={properties.body_class}>
      <section className="container">
        <header>
          <h1>
            <a href="/" title="Go to the home page">
              <img className="avatar" alt="" width="150" height="150" src="/images/brendan/brendan-2024_150.webp" />
              Brendan Murty
            </a>
          </h1>
        </header>

        <article>{children}</article>
      </section>
    </body>
  </html>
);
