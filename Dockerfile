# Construct the initial site builder image
FROM denoland/deno:ubuntu-1.45.5 AS builder
WORKDIR /murty-website
COPY . .

# Install system-level packages
RUN apt update && apt-get -y install exiftool

# Build the site
RUN deno task setup
RUN deno task build

# Construct the minimal image to serve the built site
FROM node:lts-slim AS server
EXPOSE 8000
WORKDIR /murty-website
ENV NODE_ENV=production

# Install system-level packages
RUN npm install -g http-server

# Copy over the built website files from the builder image
COPY --from=builder /murty-website/public .

# Serve the site at http://localhost:8000
CMD ["http-server", "-p", "8000"]
