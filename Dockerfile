FROM node:lts-alpine as build-runner
RUN echo "TEST"
WORKDIR /tmp/app
COPY package.json .
RUN npm install
COPY src ./src
COPY tsconfig.json .
RUN npm run build

FROM node:lts-alpine as prod-runner
WORKDIR /app
COPY --from=build-runner /tmp/app/package.json /app/package.json
RUN npm install --omit=dev
COPY --from=build-runner /tmp/app/dist /app/dist
EXPOSE 4000
CMD [ "node", "dist/app/main.js"]