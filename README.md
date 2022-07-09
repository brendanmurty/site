# murty.au

[![Deployment](https://github.com/brendanmurty/murty-website/actions/workflows/deployment.yml/badge.svg)](https://github.com/brendanmurty/murty-website/actions/workflows/deployment.yml)

This repository contains the website for the [Murty family](https://murty.au/). It's built with [Deno](https://deno.land/), [Lume](https://lumeland.github.io/), purchased fonts from [Mass-Driver](https://mass-driver.com/) and [Font Awesome 5 Pro](https://fontawesome.com/pro) SVG icons.

## Initial Setup

To setup a new local development environment:

1. Fork this repository
2. Make a local clone of that
3. Install [Deno](https://deno.land/)
4. Run [bin/setup](bin/setup) to complete the initial installation process: `bin/setup`

## Commands

### Run tests

Run [bin/test](bin/test):

```
bin/test
```

### Local web server

Run [bin/serve](bin/serve):

```
bin/serve
```

### Build site

Run [bin/build](bin/build):

```
bin/build
```

## Production Use

### Initial Setup

1. Make a fork of this repository
2. Update some files in the forked repository:
  - Files in the `scripts/production` directory must use your production domain(s) and server details instead
  - All files in the `content` directory should contain your own content instead
  - All files in the `assets` directory should contain your own static files instead
  - Update or remove the GitHub Sponsors file at [.github/FUNDING.yml](.github/FUNDING.yml)
  - Purchase your own license to use [Mass-Driver](https://mass-driver.com/) fonts or use other fonts
  - Purchase your own license to use [Font Awesome 5 Pro](https://fontawesome.com/pro) SVG icons or use other icons
3. Commit all of these changes to your forked repository
4. Setup your [Deno Deploy](https://deno.com/deploy) account:
  - Consider subscribing to the Deno Deploy Pro account based on your usage needs
  - Link to your GitHub account
  - Create a new Deno Deploy project for this site
  - Link your Deno Deploy project to your forked GitHub repository
  - Add your production domain(s) via `Settings > Domains`
5. Update the deployment GitHub Action file ([.github/workflows/deployment.yml](.github/workflows/deployment.yml)) so that the `project` name in the `denoland/deployctl` section matches your Deno Deploy project name
6. Complete your first deployment by following the related section below
7. Test it all works for your production domain(s)

### Deployment - Setup

Navigate to your forked repository on GitHub, then go to `Settings > Environments`.

Create a new Environment named `deploy`.

Then add some new Environment Secrets to the `deploy` Environment:

1. Deno Deploy key:
  - Name: `DENO_DEPLOY_TOKEN`
  - Value: The related Access Token from your [Deno Deploy](https://deno.com/deploy) account
  - Example: `aaabbbccc222`
2. Pirsch analytics site code:
  - Name: `PIRSCH_ANALYTICS_SITE_CODE`
  - Value: The related site code from your [Pirsch analytics](https://pirsch.io/) account
  - Example: `aaabbbccc222`

Go back to your forked repository on GitHub, then go to `Settings > Secrets > Actions`.

Add the above secrets again as Repository Secrets.

### Deployment - Process

After testing locally, commit and push your changes up to your remote forked repository.

Then run [bin/deploy](bin/deploy) to make a new version and deploy it:

```
bin/deploy "YYYY.xxx"
```

Where `YYYY` is the current year, and `xxx` is the revision number for that year.

This script will:

- Update the content in [CHANGELOG.md](CHANGELOG.md)
- Create a new Git Tag (`YYYY.xxx` as detailed above)
- Push changes up to the origin repository
- This will then trigger an automated deployment process with GitHub Actions via [.github/workflows/deployment.yml](.github/workflows/deployment.yml)
- That process will then make a new deployment in your related Deno Deploy account

Following this, in the **Deployments** tab in Deno Deploy, you need to manually select the **Promote to Production** option for this this deployment for it to be used by your configured domains.
