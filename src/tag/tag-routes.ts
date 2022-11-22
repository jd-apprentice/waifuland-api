// External Modules
import { Router } from "express";

// Internal Modules
import tagController from "./tag-controller";

const tagRouter = Router();

tagRouter.get("/", tagController.getTags);
tagRouter.get("/:id", tagController.getTagsId);

export default tagRouter;
