import { Router } from "express";
import imageRouter from "./image.routes";
import userRouter from "./user.routes";
import tagRouter from "./tag.routes";
const routes = Router();

routes.use("/images", imageRouter);
routes.use("/user", userRouter);
routes.use("/tags", tagRouter);

export default routes;
