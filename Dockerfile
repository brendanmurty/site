# Initial image to build the site
FROM denoland/deno:alpine-1.44.4 AS builder

# Install system dependencies
RUN apk add --no-cache bash exiftool

WORKDIR /app
COPY . .

# Build the site
RUN deno task setup
RUN deno task build

# Final image to serve the built site
FROM ghcr.io/static-web-server/static-web-server:2-alpine AS server
EXPOSE 8000

WORKDIR /app

# Copy over only the built website from the builder image
COPY --from=builder /app/public .

# Serve the site at http://localhost:8000
CMD static-web-server -p 8000 -d /app
