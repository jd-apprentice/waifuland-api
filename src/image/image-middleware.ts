// External Modules
import { Request } from 'express';
import multer from 'multer';
import boom from '@hapi/boom';

// Internal Modules
import { FileMulter } from '../common/interfaces/types';

/**
 * @description middleware for checking if the user is uploading anything but an image
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fileFilter = (req: Request, file: FileMulter, cb: any) => {
  if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
    return cb(boom.badRequest('Only images are allowed'), false);
  }
  cb(null, true);
};

/**
 * @description Some configuration for the upload middelware
 * @param {fileSize} Maximum size for the file
 */
const upload = multer({
  dest: 'src/image/assets/images',
  limits: { fileSize: 5000000 },
  fileFilter,
});

export default upload;
