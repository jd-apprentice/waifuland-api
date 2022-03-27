import { Router } from "express";
const userRouter = Router();
import UserController from "../controllers/userController";
import userMiddleware from "../middleware/userMiddleware";

userRouter.get("/validate", userMiddleware, UserController.validateUser);
userRouter.post("/create", userMiddleware, UserController.createUser);

export default userRouter;
