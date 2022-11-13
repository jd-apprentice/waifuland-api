import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import routes from "./routes/index";
import Config from "./config/config";
import helmet from "helmet";

async function run(): Promise<typeof mongoose | void> {
  const { uri } = Config.db;
  if (uri) {
    await mongoose.connect(uri).catch((err) => console.log(err));

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
