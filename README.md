# Site

This repository contains my website at [bcm.works](https://bcm.works/), related assets, tooling and documentation.

## Status

[![Uptime](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fbcm-works%2Fstatus%2Fmain%2Fapi%2Fbcm-works%2Fuptime.json&style=flat-square&logo=upptime&label=Website%20Uptime&labelColor=444444)](https://github.com/bcm-works/status)

## Structure

- [.github](.github/) - GitHub config and [Actions](https://github.com/features/actions) workflows.
- [.prototypes](.prototypes/) - Ideas and half-built prototypes.
- [.zed](.zed/) - Customised [Zed Editor](https://zed.dev/) project configuration.
- [content](content/) - Website page content in [Markdown](https://daringfireball.net/projects/markdown/syntax) files.
- [docs](docs/) - Documentation and contextual information.
- [docs/adrs](docs/adrs/) - Architecture decision records in [Markdown](https://daringfireball.net/projects/markdown/syntax) files.
- [docs/AI-USE.md](docs/AI-USE.md) - Policy for use of AI Code Generation tools.
- [docs/DESIGN.md](docs/DESIGN.md) - Frontend website design and CSS theming rules.
- [docs/INFRA.md](docs/INFRA.md) - Infrastructure and deployment documentation.
- [src/backend](src/backend/) - Backend [Deno](https://deno.land/) file server, API and utilities.
- [src/cli](src/cli/) - CLI tool written in [Go](https://go.dev/).
- [src/frontend](src/frontend/) - Frontend [Lume](https://lume.land/) templates and styles.
- [src/frontend/styles/theme.css](src/frontend/styles/theme.css) - Frontend design colour scheme and theme setup.
- [src/frontend/manifest.json](src/frontend/manifest.json) - Progressive Web App configuration.
- [.editorconfig](.editorconfig) - Sets basic code style rules via [EditorConfig](https://editorconfig.org)
- [Dockerfile](Dockerfile) - Production [Docker](https://www.docker.com/) container build for the static site and backend API.
- [deno.json](deno.json) - [Deno](https://deno.land/) imports, tasks and configuration.
- [opencode.json](opencode.json) - AI config for [OpenCode](https://opencode.ai/).

## Tech Stack

- [Railway](https://railway.com/) - Infrastructure and deployment.
- [GitHub Actions](https://github.com/features/actions) - Test workflow, PR template and Dependabot config.
- [PostHog](https://posthog.com/) - Site analytics and visitor usage insights.
- [Go](https://go.dev/) - Tasks CLI.
- [Deno](https://deno.land/) and [TypeScript](https://www.typescriptlang.org/) - Backend, Frontend, and Unit Tests.
- [Lume](https://lume.land/) - Static site generator for Deno.
- [Fonts by Mass-Driver](https://mass-driver.com/) - I have purchased licenses for use here.
- [Font Awesome free icon pack](https://fontawesome.com/) - Used for icons on various pages and layouts.
- [Emblem](https://flathub.org/apps/details/org.gnome.design.Emblem) - Used to create the site logo and favicon images.

## Required Tools

- [Deno](https://deno.com/) (`latest stable`) - Consider installing via my [Deno setup script](https://github.com/bcm-works/dotfiles/blob/main/dev/deno.sh).
- [Go](https://go.dev/) (`1.27`) - Consider installing via my [Go setup script](https://github.com/bcm-works/dotfiles/blob/main/dev/go.sh).

## Optional Tools

- [GitHub CLI](https://cli.github.com/) - Consider installing via my [GitHub setup script](https://github.com/bcm-works/dotfiles/blob/main/dev/git/github.sh).
- AI tools - Consider installing via my [Dotfiles AI directory](https://github.com/bcm-works/dotfiles/tree/main/ai).

## Helper Commands

A `task` binary is included to make it easier to run local dev tasks. The source code for this is in [src/cli](src/cli/).

Run the `setup` task to setup your local environment:

```bash
./task setup
```

To list all of the available tasks:

```bash
./task list
```

## Docker image

The [Dockerfile](Dockerfile) contains the production container build for the static site and
backend API. The image intentionally supports `linux/amd64` only.

### Build

From the repository root:

```bash
./task docker-build
```

The build helper reads site configuration from `.env`, falling back to the
current process environment. Site metadata is needed at build time because Lume
embeds it in the generated static pages, so the helper passes it to the image as
Docker build arguments (`SITE_*`).

`SITE_BUILD_DIR`, and `SITE_PUBLIC_DIR` can also be set in the
environment before running the helper.

### Run locally

```bash
./task docker-start
```

The helper starts `bcm-site:latest` and publishes it at
`http://localhost:${PORT:-${SITE_PORT:-8000}}`. Runtime API configuration is
read from `.env` or from the current process environment.

The service:

- binds to `PORT`, then `SITE_PORT`, then `8000`;
- serves its health endpoint at `/api/health/`;
- runs as the unprivileged `deno` user; and
- starts using only dependencies cached in the image.

Stop it with:

```bash
./task docker-stop
```

### Hosted environments

Build the image for `linux/amd64` and inject runtime secrets through the hosting
platform's environment-variable store. Set `PORT` when required by the host.
Configure readiness checks against `/api/health/`; the image also includes an
equivalent Docker health check.

The hosting platform must supply the build-time `SITE_*` values as Docker build
arguments. Refer to [docs/INFRA.md](docs/INFRA.md) for the hosted
deployment setup.

## Infrastructure and Deployment

Refer to [docs/INFRA.md](docs/INFRA.md).
