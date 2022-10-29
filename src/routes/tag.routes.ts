import { Router } from "express";
import validateToken from "../middleware/tokenMiddleware";
import tagController from "../controllers/tagController";

const tagRouter = Router();

tagRouter.get("/", validateToken, tagController.getTags);
tagRouter.get("/:id", validateToken, tagController.getTagsId);

export default tagRouter;
