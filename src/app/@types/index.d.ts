export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DB_HOST: string;
      TOKEN: string;
      CLOUD_NAME: string;
      CLOUD_API_KEY: number;
      CLOUD_SECRET: string;
      CLOUDINARY_URL: string;
      NODE_ENV: string;
      ROLLBAR_TOKEN: string;
      ROLLBAR_ENVIRONMENT: string;
    }
  }
}
