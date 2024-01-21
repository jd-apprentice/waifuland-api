FROM node:lts-alpine as build-runner
WORKDIR /tmp/app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY src ./src
COPY tsconfig*.json ./
RUN npm run build

FROM node:lts-alpine as prod-runner
WORKDIR /app
COPY --from=build-runner /tmp/app/package*.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY --from=build-runner /tmp/app/dist ./dist
EXPOSE 4000
CMD [ "node", "dist/app/index.js"]