# murty.au

This repository contains the website for the [Murty family](https://murty.au/). It's built with [Deno](https://deno.land/), [Lume](https://lumeland.github.io/), purchased fonts from [Mass-Driver](https://mass-driver.com/) and [Font Awesome](https://fontawesome.com/)  icons.

## Initial Setup

To setup a new local development environment:

1. Fork this repository
2. Make a local clone of that forked repository
3. Update some files in the forked repository:
  - The `bin/deploy` script must be updated to use your forked repository URLs when updating `CHANGELOG.md`
  - The `bin/deploy` script must be updated to use your own Deno Deploy project name in the `deployctl` line
  - All files in the `content` directory should contain your own content instead
  - All files in the `assets` directory should contain your own static files instead
  - Purchase your own license to use [Mass-Driver](https://mass-driver.com/) fonts or use other fonts
4. Commit and push all of these changes to your forked repository
5. Setup your [Deno Deploy](https://deno.com/deploy) account:
  - Consider subscribing to the Deno Deploy Pro account based on your usage needs
  - Create a new Deno Deploy project for this site
  - Add your production domain(s) via `Settings > Domains`
5. Install [Deno](https://deno.land/)
6. Run [bin/setup](bin/setup) to complete the initial installation process: `bin/setup`
7. Update your `.env` file:
  - `GOOGLE_ANALYTICS_SITE_CODE`: The related site code from your [Google Analytics](https://analytics.google.com/) account
  - `LASTFM_API_KEY`: Your [Last.fm API key](https://www.last.fm/api/account/create) to show your loved tracks on the site
8. Create a new system environment variable named 'DENO_DEPLOY_TOKEN' by following [their documentation](https://deno.com/deploy/docs/deployctl)

## Commands

### Run Tests

Run [bin/test](bin/test):

```
bin/test
```

### Local Web Server

Run [bin/serve](bin/serve):

```
bin/serve
```

### Build Site

Run [bin/build](bin/build):

```
bin/build
```

### Deployment

After testing locally, commit and push your changes up to your remote forked repository.

Then run [bin/deploy](bin/deploy) to make a new version and deploy it:

```
bin/deploy YYYY.xxx
```

Where `YYYY` is the current year, and `xxx` is the revision number for that year.

This script will:

- Update the content in [CHANGELOG.md](CHANGELOG.md)
- Create a new Git Tag (`YYYY.xxx` as detailed above)
- Push changes up to the origin repository
- Build the site
- Deploy the site to Deno Deploy as a production deployment
