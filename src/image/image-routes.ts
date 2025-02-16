// External Modules
import { Router } from 'express';

// Internal Modules
import { isAdmin, validateToken } from '../user/user-middleware';
import ImageController from './image-controller';
import upload from './image-middleware';
import { limiter } from 'src/common/utils/limiter';

const imageRouter = Router();

imageRouter.post(
  '/',
  limiter,
  validateToken,
  isAdmin,
  upload.single('image'),
  ImageController.uploadFile,
);
imageRouter.get('/', limiter, ImageController.getRandomImage);
imageRouter.get('/all', limiter, ImageController.getImages);

export default imageRouter;
