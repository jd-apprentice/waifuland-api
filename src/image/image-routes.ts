// External Modules
import { Router } from "express";

// Internal Modules
import { isAdmin, validateToken } from "../user/user-middleware";
import ImageController from "./image-controller";
import upload from "./image-middleware";

const imageRouter = Router();

imageRouter.post(
  "/",
  validateToken,
  isAdmin,
  upload.single("image"),
  ImageController.uploadFile
);
imageRouter.get("/", ImageController.getRandomImage);
imageRouter.get("/all", ImageController.getImages);

export default imageRouter;
