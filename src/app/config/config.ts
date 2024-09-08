const {
  PORT,
  DB_HOST,
  TOKEN,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_SECRET,
  CLOUDINARY_URL,
  NODE_ENV,
  ROLLBAR_TOKEN,
  ROLLBAR_ENVIRONMENT,
} = process.env;

const Config = {
  app: {
    port: PORT,
    environment: NODE_ENV,
  },
  db: {
    uri: DB_HOST,
  },
  jwt: {
    secret: TOKEN,
  },
  cloudinary: {
    name: CLOUD_NAME,
    key: CLOUD_API_KEY,
    secret: CLOUD_SECRET,
    url: CLOUDINARY_URL,
  },
  rollbar: {
    accessToken: ROLLBAR_TOKEN,
    environment: ROLLBAR_ENVIRONMENT,
  }
};

export default Config;
