// External Modules
import { Router } from 'express';
import rateLimit from 'express-rate-limit';

// Internal Modules
import userController from './user-controller';
import upload from '../image/image-middleware';
import { userExists, validateUser, validateToken } from './user-middleware';

const userRouter = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

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
