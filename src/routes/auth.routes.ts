import { Router } from "express";
const userRouter = Router();
import UserController from "../controllers/userController";
import { userExists, validateUser } from "../middleware/userMiddleware";

userRouter.get("/login", validateUser, UserController.login);
userRouter.post("/create", userExists, UserController.createUser);

export default userRouter;
