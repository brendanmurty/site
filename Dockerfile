# Initial image to build the site
FROM denoland/deno:alpine-1.44.4 as builder

# Install system dependencies
RUN apk add --no-cache bash exiftool

WORKDIR /app
COPY . .

RUN deno task setup
RUN deno task build

# Final image to serve the built site
FROM ghcr.io/static-web-server/static-web-server:2-alpine as server
EXPOSE 8000

WORKDIR /app

COPY --from=builder /app/docs .

CMD static-web-server -p 8000 -d /app
