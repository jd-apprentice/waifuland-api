import { Router } from "express";
import validateToken from "../middleware/tokenMiddleware";
const userRouter = Router();
import userController from "../controllers/userController";
import { userExists, validateUser } from "../middleware/userMiddleware";
import upload from "../middleware/imageMiddleware";

userRouter.get("/", validateToken, userController.getUsers);
userRouter.get("/info", validateToken, userController.getUserInfo);
userRouter.post("/login", validateUser, userController.login);
userRouter.post("/create", userExists, userController.createUser);
userRouter.get("/:id", validateToken, userController.getUser);
userRouter.patch(
  "/",
  validateToken,
  upload.single("image"),
  userController.updatePicture
);

export default userRouter;
