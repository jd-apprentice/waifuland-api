FROM oven/bun:1 AS base
WORKDIR /bun

FROM base AS install

RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/prod/node_modules node_modules
COPY src src

RUN mkdir -p /bun/src/image/assets/images
RUN chmod -R 600 /bun/src/image/assets/images

ENV NODE_ENV=production
USER bun
EXPOSE 4000
CMD ["bun", "/bun/src/app/index.ts"]