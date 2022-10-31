import { Router } from "express";
import validateToken from "../middleware/tokenMiddleware";
import ImageController from "../controllers/imageController";
import upload from "../middleware/imageMiddleware";
import { isAdmin } from "../middleware/userMiddleware";

const imageRouter = Router();

imageRouter.post(
  "/",
  validateToken,
  isAdmin,
  upload.single("image"),
  ImageController.uploadFile
);
imageRouter.get("/", validateToken, ImageController.getRandomImage);
imageRouter.get("/all", validateToken, ImageController.getImages);

export default imageRouter;
