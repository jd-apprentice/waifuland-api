FROM dyallo/clockbox
RUN npm install
CMD ["npm run start:dev"]
