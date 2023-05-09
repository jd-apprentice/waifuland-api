FROM dyallo/clockbox
RUN npm run build
RUN npm install
CMD ["npm run start:dev"]
