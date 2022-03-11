import { Router } from "express";
const userRouter = Router();
import UserController from '../controllers/userController'

userRouter.post("/register", UserController.register);
userRouter.get("/login", UserController.login);

export default userRouter;
