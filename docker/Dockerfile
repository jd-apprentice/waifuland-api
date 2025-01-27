FROM oven/bun:slim AS base
WORKDIR /bun

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run lint
RUN bun run build

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /bun/dist ./dist

RUN mkdir -p /bun/src/image/assets/images
RUN chown -R bun:bun /bun/src/image/assets/images
RUN chmod -R 600 /bun/src/image/assets/images

USER bun
EXPOSE 4000
ENTRYPOINT [ "dist/waifuland" ]