// External Modules
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";
import cors from "cors";
import Rollbar from "rollbar";
dotenv.config(); // Load environment variables

// Internal Modules
import routes from "./routes/index";
import Config from "./config/config";

// Rollbar
export const rollbar = new Rollbar({
  accessToken: Config.rollbar.accessToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: Config.rollbar.environment,
});

async function run(): Promise<typeof mongoose | void> {
  const { uri } = Config.db;
  if (uri) {
    await mongoose.connect(uri).catch((err) => rollbar.error(err));

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(helmet());
    app.use("/api", routes);

    app.listen(Config.app.port || 3000, (): void => {
      console.log(`
      ██╗    ██╗ █████╗ ██╗███████╗██╗   ██╗██╗      █████╗ ███╗   ██╗██████╗      █████╗ ██████╗ ██╗
      ██║    ██║██╔══██╗██║██╔════╝██║   ██║██║     ██╔══██╗████╗  ██║██╔══██╗    ██╔══██╗██╔══██╗██║
      ██║ █╗ ██║███████║██║█████╗  ██║   ██║██║     ███████║██╔██╗ ██║██║  ██║    ███████║██████╔╝██║
      ██║███╗██║██╔══██║██║██╔══╝  ██║   ██║██║     ██╔══██║██║╚██╗██║██║  ██║    ██╔══██║██╔═══╝ ██║
      ╚███╔███╔╝██║  ██║██║██║     ╚██████╔╝███████╗██║  ██║██║ ╚████║██████╔╝    ██║  ██║██║     ██║
       ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝╚═╝      ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝     ╚═╝  ╚═╝╚═╝     ╚═╝`);
    });
  }
}

run();
