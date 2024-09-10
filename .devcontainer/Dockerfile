FROM denoland/deno:bin-1.46.3 AS deno
FROM mcr.microsoft.com/devcontainers/typescript-node:20
COPY --from=deno /deno /usr/local/bin/deno
RUN apt-get update && apt-get -y install libimage-exiftool-perl