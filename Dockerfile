## build runner
FROM node:lts-alpine as build-runner

# Set temp directory
WORKDIR /tmp/app

# Move package.json
COPY package.json .

# Install dependencies
RUN npm install

# Move source files
COPY src ./src
COPY tsconfig.json .

# Build project
RUN npm build:dev

## producation runner
FROM node:lts-alpine as prod-runner

# Set work directory
WORKDIR /app

# Copy package.json from build-runner
COPY --from=build-runner /tmp/app/package.json /app/package.json

# Install dependencies
RUN npm install --production

# Move build files
COPY --from=build-runner /tmp/app/dist /app/dist

# Expose ports
EXPOSE 4000

# Start
CMD [ "node", "dist/index.js" ]
