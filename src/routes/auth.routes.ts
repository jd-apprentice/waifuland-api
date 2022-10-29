import { Router } from "express";
const userRouter = Router();
import UserController from "../controllers/userController";
import { userExists, validateUser } from "../middleware/userMiddleware";

userRouter.post("/login", validateUser, UserController.login);
userRouter.post("/create", userExists, UserController.createUser);
userRouter.get("/:id", UserController.getUser);

export default userRouter;
