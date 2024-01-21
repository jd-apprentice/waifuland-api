// External Modules
import helmet from "helmet";
import express from "express";
import cors from "cors";

// Internal Modules
import routes from "./routes/index";

// Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use("/api", routes);
app.use("/", (req, res) => {
  res.status(200).json({ message: "Allo! Catch-all route." });
});

export { app };