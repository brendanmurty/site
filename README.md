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
  - Update the deployment GitHub Action file at [.github/workflows/deployment.yml](.github/workflows/deployment.yml)
  - Purchase your own license to use [Mass-Driver](https://mass-driver.com/) fonts or use other fonts
  - Purchase your own license to use [Font Awesome 5 Pro](https://fontawesome.com/pro) SVG icons or use other icons
3. Commit all of these changes to your forked repository
4. SSH in to a new **Ubuntu 20.04** server
5. Setup Git including [initial configuration](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup) and an [SSH key](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) for GitHub access from your server
6. Git Clone your forked repository in to `~/site` and `cd` in to that directory
7. Run the main setup script: `bin/setup`
8. Edit the `.env` file so it has the appropriate configuration values
9. Run the production setup script: `bin/setup-production`
10. Setup a scheduled task to renew the SSL certificate via `crontab -e`: `0 0 1 * * sudo certbot renew --force-renewal --no-random-sleep-on-renew`
11. Test it all works for your production domain(s)

### Deployment - Setup

Navigate to your forked repository on GitHub, then go to `Settings > Environments`.

Create a new Environment named `deploy`.

Then add some new Environment Secrets to the `deploy` Environment:

1. SSH Host:
  - Name: `SSH_HOST`
  - Value: IP address of your web server
  - Example: `123.1.2.3`
2. SSH Username:
  - Name: `SSH_USERNAME`
  - Value: The username you use to login to the server
  - Example: `jane_doe`
3. SSH Password:
  - Name: `SSH_PASSWORD`
  - Value: The password you use to login to the server
  - Example: `s$crt534^fff`
4. Remote Directory:
  - Name: `REMOTE_DIRECTORY`
  - Value: The directory where the Git repository is located on the server
  - Example: `/home/jane_doe/site`

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
