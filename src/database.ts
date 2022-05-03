import mongoose from "mongoose";

export async function run(): Promise<typeof mongoose | void> {
  await mongoose
    .connect(process.env.DB_HOST!)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));
}
