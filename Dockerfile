FROM denoland/deno:alpine-1.46.2 AS site
EXPOSE 8000
WORKDIR /murty-website
COPY . .

# Install system-level packages
RUN apk add --no-cache bash exiftool

# Configure and build the site
RUN deno task setup
RUN deno task build

# Change to a new non-root user
RUN adduser --disabled-password --no-create-home murty
RUN chown -R murty:murty /murty-website
RUN chown -R murty:murty /deno-dir
USER murty

# Serve the site at http://localhost:8000
CMD ["deno", "task", "deno-serve"]
