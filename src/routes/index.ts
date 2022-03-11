import { Router } from 'express';
import imageRouter from './image.routes';
import userRouter from './auth.routes'
const routes = Router();

routes.use('/images', imageRouter);
routes.use('/user', userRouter);

export default routes;