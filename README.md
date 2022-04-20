# murty.au

This repository contains the website for the [Murty family](https://murty.au/). It's built with [Deno](https://deno.land/), [Lume](https://lumeland.github.io/), purchased fonts from [Mass-Driver](https://mass-driver.com/) and [Font Awesome 5 Pro](https://fontawesome.com/pro) SVG icons.

## Initial Setup

To setup a new local development environment, fork this repository, make a local clone of that and then run [scripts/setup.sh](scripts/setup.sh) to complete the initial installation process:

```
bash scripts/setup.sh
```

## Commands

### Local web server

Run [scripts/serve.sh](scripts/serve.sh):

```
bash scripts/serve.sh
```

### Build site

Run [scripts/build.sh](scripts/build.sh):

```
bash scripts/build.sh
```

## Production Use

### Initial Setup

1. Make a fork of this repository
2. Update the files in the `scripts/production` directory to use your production domain(s) and server details instead
3. Commit these changes to your forked repository
4. SSH in to a new **Ubuntu 20.04** server
5. Setup Git including [initial configuration](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup) and an [SSH key](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) for GitHub access from your server
6. Git Clone your forked repository in to `~/site` and `cd` in to that directory
7. Run the main setup script: `bash scripts/setup.sh`
8. Edit the `.env` file so it has the appropriate configuration values
9. Run the production setup script: `bash scripts/production/setup.sh`
10. Setup a scheduled task to renew the SSL certificate via `crontab -e`: `0 0 1 * * sudo certbot renew --force-renewal --no-random-sleep-on-renew`
11. Test it all works for your production domain(s)

### Deployment

#### Setup

Navigate to your forked repository on GitHub, then go to `Settings > Secrets`.

Add new secrets here:

- SSH Host:
  - Name: `SSH_HOST`
  - Value: IP address of your web server
  - Example: `123.1.2.3`
- SSH Username:
  - Name: `SSH_USERNAME`
  - Value: The username you use to login to the server
  - Example: `jane_doe`
- SSH Password:
  - Name: `SSH_PASSWORD`
  - Value: The password you use to login to the server
  - Example: `s$crt534^fff`
- Remote Directory:
  - Name: `REMOTE_DIRECTORY`
  - Value: The directory where the Git repository is located on the server
  - Example: `/root/site`

#### Process

After testing locally, commit and push your changes up to your remote forked repository.

Then run [scripts/deploy.sh](scripts/deploy.sh) to make a new version and deploy it:

```
bash scripts/deploy.sh "YYYY.xxx"
```

Where `YYYY` is the current year, and `xxx` is the revision number for that year.

This script will:

- Update the content in [CHANGELOG.md](CHANGELOG.md)
- Create a new Git Tag (`YYYY.xxx` as detailed above)
- Push changes up to the origin repository
- This will then trigger an automated deployment process with GitHub Actions via [.github/workflows/deployment.yml](.github/workflows/deployment.yml)
