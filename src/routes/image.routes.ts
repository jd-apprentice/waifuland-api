import { Router } from "express";
import ImageController from "../controllers/imageController";
import upload from "../middleware/imageMiddleware";

const imageRouter = Router();

imageRouter.post("/", upload.single("image"), ImageController.uploadFile);
imageRouter.get("/", ImageController.getFiles);

export default imageRouter;
