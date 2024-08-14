# Murty Website

[ ![Deployment Status](https://img.shields.io/github/actions/workflow/status/brendanmurty/murty-website/deployment.yml?label=Deployment%20Status&style=flat-square&color=%2323c5b0&labelColor=%23222222)](https://github.com/brendanmurty/murty-website/actions/workflows/deployment.yml)
[ ![Latest Release](https://img.shields.io/github/v/release/brendanmurty/murty-website?label=Latest%20Release&style=flat-square&color=%2323c5b0&labelColor=%23222222)](https://github.com/brendanmurty/murty-website/releases)
[ ![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fmurty.au&up_message=online&down_message=offline&style=flat-square&logo=globe&label=Website%20Status&labelColor=%23222222)](https://murty.au)

## Summary

This repository contains the website for the [Murty family](https://murty.au/), which has been built with [Deno](https://deno.land/), [Lume](https://lumeland.github.io/), fonts that I've purchased from [Mass-Driver](https://mass-driver.com/), and the free icon pack from [Font Awesome](https://fontawesome.com/).

Tests, build and local server commands are available from local environments.

Remote testing and [GitHub Pages](https://pages.github.com/) deployment can be triggered locally and is then handled remotely by a GitHub Actions workflow in [.github/workflows/deployment.yml](.github/workflows/deployment.yml).

### Preview of the home page

![Preview of the home page](assets/docs/website-preview.png)

### Lighthouse performance results

![Lighthouse performance results](assets/docs/lighthouse-results.png)

## Folder structure and key files

- [.github/workflows/deployment.yml](.github/workflows/deployment.yml) - Triggers when a release tag is pushed, runs tests, deploys to [GitHub Pages](https://pages.github.com/) and publishes a new [release](https://github.com/brendanmurty/murty-website/releases)
- [.vscode](.vscode/) - Customised [VS Code](https://code.visualstudio.com/) configuration for this repository
- [assets](assets/) - Static files like images and PDFs
- [content](content/) - Website page content in [Markdown](https://daringfireball.net/projects/markdown/syntax) files
- [scripts](scripts/) - Helper scripts, refer to the `Commands` section below for more details
- [src](src/) - Source code, templates and CSS files
- [deno.json](deno.json) - [Deno](https://deno.land/) imports, tasks and configuration for this repository

## Initial setup

1. Fork this repository
2. Make a local clone of that forked repository
3. Update some files in the forked repository:

- The `scripts/deploy.sh` script must be updated to use your forked repository URLs when updating `CHANGELOG.md`
- All files in the `content` directory should contain your own content instead
- All files in the `assets` directory should contain your own static files instead
- Purchase your own license to use [Mass-Driver](https://mass-driver.com/) fonts or use other fonts

4. Commit and push all of these changes to your forked repository
5. Setup [GitHub Pages](https://pages.github.com/) for your forked repository:

- Repository settings > Pages > Source: _GitHub Actions_
- Repository settings > Pages > Custom domain: _use your own domain_
- Update the `CNAME` file to use this same domain

6. Install [Deno](https://deno.land/)
7. Run [scripts/setup.sh](scripts/setup.sh) to complete the initial installation process: `deno task setup`
8. Update your `.env` file:

- `GOOGLE_ANALYTICS_SITE_CODE`: The related site code from your [Google Analytics](https://analytics.google.com/) account

9. Install [exiftool](https://exiftool.org/) on your local machine
10. **Optional:** Install [VS Code](https://code.visualstudio.com/) and the recommended plugins:

- [Deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Commands

### Run all tests

```
deno task test
```

### Build the site

```
deno task build
```

### Local web server

```
deno task serve
```

### Deployment

After testing locally, run [scripts/deploy.sh](scripts/deploy.sh):

```
deno task deploy YYYY.xxx
```

Where `YYYY` is the current year, and `xxx` is the revision number for that year, such as `2024.036`.

This process will:

- Update the content in [CHANGELOG.md](CHANGELOG.md)
- Create a new Git Tag (`YYYY.xxx` as detailed above)
- Push changes up to the origin repository
- Trigger the GitHub Actions workflow from [.github/workflows/deployment.yml](.github/workflows/deployment.yml), which will test, build and deploy the site via GitHub Pages
