# Docker image

This directory contains the production container build for the static site and
backend API. The image intentionally supports `linux/amd64` only.

## Build

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

## Run locally

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

## Hosted environments

Build the image for `linux/amd64` and inject runtime secrets through the hosting
platform's environment-variable store. Set `PORT` when required by the host.
Configure readiness checks against `/api/health/`; the image also includes an
equivalent Docker health check.

The hosting platform must supply the build-time `SITE_*` values as Docker build
arguments. Refer to [docs/INFRA.md](../../docs/INFRA.md) for the hosted
deployment setup.
