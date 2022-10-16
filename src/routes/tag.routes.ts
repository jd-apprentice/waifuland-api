import { Router } from "express";
import tagController from "../controllers/tagController";

const tagRouter = Router();

tagRouter.get("/", tagController.getTags);
tagRouter.get("/:id", tagController.getTagsId);

export default tagRouter;
