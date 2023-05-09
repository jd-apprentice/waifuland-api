FROM node:lts-alpine
RUN npm install
CMD ["npm", "run", "start:dev"]
