import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import routes from "./routes/index";
import Config from "./config/config";
import morgan from "morgan";

async function run(): Promise<typeof mongoose | void> {
  const { uri } = Config.db;
  if (uri) {
    await mongoose
      .connect(uri)
      .then(() => console.log("Conected to database"))
      .catch((err) => console.log(err));

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan("dev"));
    app.use(cors());
    app.use("/api", routes);

    app.listen(Config.app.port || 3000, (): void => {
      console.log(`Server is running on port ${Config.app.port}`);
    });
  }
}

run();
