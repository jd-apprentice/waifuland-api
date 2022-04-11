import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose
  // @ts-ignore
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((): void => {
    console.log("Connected to database");
  })
  .catch((err): void => {
    console.log(err);
  });
