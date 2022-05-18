import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import routes from "./routes/index";

async function run(): Promise<typeof mongoose | void> {
  await mongoose
    .connect(process.env.DB_HOST!)
    .then(() => console.log("Conected to database"))
    .catch((err) => console.log(err));

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use("/api", routes);

  app.listen(process.env.PORT || 3000, (): void => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}

run();
