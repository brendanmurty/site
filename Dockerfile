FROM denoland/deno:alpine-1.45.5 AS site
EXPOSE 8000
WORKDIR /murty-website
COPY . .

# Install system-level packages
RUN apk add --no-cache bash exiftool

# Configure and build the site
RUN deno task setup
RUN deno task build

# Serve the site at http://localhost:8000
CMD ["deno", "task", "deno-serve"]
