import { Router } from "express";
import validateToken from "../middleware/tokenMiddleware";
const userRouter = Router();
import UserController from "../controllers/userController";
import { userExists, validateUser } from "../middleware/userMiddleware";

userRouter.get("/validate", validateUser, UserController.validateUser);
userRouter.get("/token", validateToken, UserController.validateToken);
userRouter.post("/create", userExists, UserController.createUser);

export default userRouter;
