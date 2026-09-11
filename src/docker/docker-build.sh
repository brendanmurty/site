#!/usr/bin/env bash
#
#
# Docker build
#
#

set -euo pipefail

REPO="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO"

DOCKERFILE="$REPO/src/docker/Site.Dockerfile"

ENVFILE="$REPO/.env"

if [ -f "$ENVFILE" ]; then
  echo "Env file found; using it for build-time site configuration."
  set -a
  # shellcheck disable=SC1090
  source "$ENVFILE"
  set +a
else
  echo "No env file found; using system environment variables for build-time site configuration."
fi

BUILD_ENV_VARS=(
  SITE_ENV
  SITE_URL
  SITE_AUTHOR
  SITE_TITLE
  SITE_DESC
  SITE_LANG
  SITE_TIMEZONE
  SITE_REPO
  SITE_FEED_TITLE
  SITE_FEED_DESC
  SITE_FEED_DEFAULT_TITLE
  SITE_POSTHOG_ID
  SITE_POSTHOG_API_HOST
  SITE_POSTHOG_UI_HOST
)

# Only pass values that are set, so the Dockerfile defaults still apply.
BUILD_ARGS=()
for var_name in "${BUILD_ENV_VARS[@]}"; do
  value="${!var_name-}"
  if [ -n "$value" ]; then
    BUILD_ARGS+=(--build-arg "${var_name}=${value}")
  fi
done

# The hash busts the build cache when the site configuration changes.
CONFIG_HASH=$(for var_name in "${BUILD_ENV_VARS[@]}"; do
  printf '%s=%s\n' "$var_name" "${!var_name-}"
done | git hash-object --stdin)

docker build \
  --platform linux/amd64 \
  --tag bcm-site:latest \
  --build-arg SITE_BUILD_DIR="${SITE_BUILD_DIR:-build}" \
  --build-arg SITE_CONFIG_HASH="${CONFIG_HASH}" \
  --build-arg SITE_PUBLIC_DIR="${SITE_PUBLIC_DIR:-public}" \
  "${BUILD_ARGS[@]}" \
  --file "$DOCKERFILE" \
  "."

echo "Docker build finished."
