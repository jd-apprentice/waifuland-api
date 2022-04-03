import { Router } from "express";
import validateToken from "../middleware/tokenMiddleware";
import ImageController from "../controllers/imageController";
import upload from "../middleware/imageMiddleware";

const imageRouter = Router();

imageRouter.post(
  "/",
  validateToken,
  upload.single("image"),
  ImageController.uploadFile
);
imageRouter.get("/", ImageController.getRandomImage);

export default imageRouter;
