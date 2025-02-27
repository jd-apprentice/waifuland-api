// External Modules
import { Router } from 'express';

// Internal Modules
import userController from './user-controller';
import upload from '../image/image-middleware';
import { userExists, validateUser, validateToken } from './user-middleware';
import { limiter } from 'src/common/utils/limiter';

const userRouter = Router();

userRouter.get('/', limiter, validateToken, userController.getUsers);
userRouter.get('/info', limiter, validateToken, userController.getUserInfo);
userRouter.post('/login', limiter, validateUser, userController.login);
userRouter.post('/create', limiter, userExists, userController.createUser);
userRouter.get('/:id', limiter, validateToken, userController.getUser);
userRouter.patch(
  '/',
  limiter,
  validateToken,
  upload.single('image'),
  userController.updatePicture,
);

export default userRouter;
