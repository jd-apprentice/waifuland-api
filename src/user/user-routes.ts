// External Modules
import { Router } from 'express';

// Internal Modules
import userController from './user-controller';
import upload from '../image/image-middleware';
import { userExists, validateUser, validateToken } from './user-middleware';

const userRouter = Router();

userRouter.get('/', validateToken, userController.getUsers);
userRouter.get('/info', validateToken, userController.getUserInfo);
userRouter.post('/login', validateUser, userController.login);
userRouter.post('/create', userExists, userController.createUser);
userRouter.get('/:id', validateToken, userController.getUser);
userRouter.patch(
  '/',
  validateToken,
  upload.single('image'),
  userController.updatePicture,
);

export default userRouter;
