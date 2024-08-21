# Construct the initial site builder image
FROM denoland/deno:ubuntu-1.45.5 AS builder

# Install system-level packages
RUN apt update && apt-get -y install exiftool

WORKDIR /murty-website
COPY . .

# Build the site
RUN deno task setup
RUN deno task build

# Construct the minimal image to serve the built site
FROM ghcr.io/static-web-server/static-web-server:2.32.2-debian AS server
EXPOSE 8000

WORKDIR /murty-website

# Only copy over the built website files from the builder image
COPY --from=builder /murty-website/public .

# Serve the site at http://localhost:8000
CMD ["static-web-server", "--port", "8000", "--root", "/murty-website"]
