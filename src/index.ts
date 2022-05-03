import app from "./server";
import { run } from "./database";
import dotenv from "dotenv";
dotenv.config();
run();
app.listen(process.env.PORT || 3000, (): void => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
