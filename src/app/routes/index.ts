// External Modules
import { Router } from "express";

// Internal Modules
import userRouter from "../../user/user-routes";
import tagRouter from "../../tag/tag-routes";
import imageRouter from "../../image/image-routes";

const routes = Router();

routes.use("/images", imageRouter);
routes.use("/user", userRouter);
routes.use("/tags", tagRouter);

export default routes;
