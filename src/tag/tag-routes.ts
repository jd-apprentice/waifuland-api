// External Modules
import { Router } from 'express';

// Internal Modules
import tagController from './tag-controller';
import { limiter } from 'src/common/utils/limiter';

const tagRouter = Router();

tagRouter.get('/', limiter, tagController.getTags);
tagRouter.get('/:id', limiter, tagController.getTagsId);

export default tagRouter;
