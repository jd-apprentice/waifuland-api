import { Router } from 'express';
import imageRouter from './image.routes';
const routes = Router();

routes.use('/images', imageRouter);

export default routes;