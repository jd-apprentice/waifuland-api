import { Router } from "express";
const userRouter = Router();
import UserController from "../controllers/userController";
import { userExists, validateUser } from "../middleware/userMiddleware";

userRouter.get("/validate", validateUser, UserController.validateUser);
userRouter.post("/create", userExists, UserController.createUser);

export default userRouter;
