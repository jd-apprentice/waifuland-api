// External Modules
import { Request, Response } from 'express';
import { LogArgument } from 'rollbar';

// Interal Modules
import clearTemporaryFiles from 'src/common/utils/clear';
import ImageService from './image-service';
import { Query } from 'src/common/interfaces/types';
import { rollbar } from 'src/app/config/rollbar';

class ImageController {
  /**
   * @description Uploads a file to Cloudinary and saves the URL in MongoDB
   * @param { Request } req - The request object containing the file and additional data
   * @returns { Promise<Response> } A JSON response with a success message
   */
  async uploadFile(req: Request, res: Response): Promise<Response> {
    try {
      const { file } = req;
      const { tag, source, is_nsfw } = req.body;

      if (!file) {
        return res.status(400).json({ error: 'File is required' });
      }

      const uploadResult = await ImageService.cloudinaryUpload(file.path);
      const { public_id, secure_url } = uploadResult;

      await ImageService.upload({
        source,
        is_nsfw,
        id: public_id,
        url: secure_url,
        tag,
      });

      clearTemporaryFiles(file.path ?? 'image/assets/images');
      return res.json({ message: 'Image saved successfully', url: secure_url });
    } catch (error: unknown) {
      rollbar.error(error as LogArgument);
      return res
        .status(500)
        .json({ error: 'An error occurred while uploading the image' });
    }
  }

  /**
   * @description Get a random waifu from the collection!
   * @param { Response } res - object with the waifu
   * @query size - number of items to retrieve
   * @query tag_id - tag to filter
   * @returns { Promise<Response> } An url with the waifu image hosted in cloudinary
   */
  async getRandomImage(req: Request, res: Response): Promise<Response> {
    try {
      const { size, tag_id } = req.query as Query;
      const images = await ImageService.getImage(size, tag_id);
      return res.json(images);
    } catch (error: unknown) {
      rollbar.error(error as LogArgument);
      return res
        .status(500)
        .json({ error: 'An error occurred while getting the image' });
    }
  }

  /**
   * @description Get all images from the database
   * @query tag_id - tag to filter
   * @param { Response } res object with the waifu
   * @returns { Promise<Response> } All images from the database without business logic
   */
  async getImages(req: Request, res: Response): Promise<Response> {
    try {
      const { tag_id } = req.query as Query;
      const images = await ImageService.getAllImages(tag_id);
      return res.json(images);
    } catch (error: unknown) {
      rollbar.error(error as LogArgument);
      return res.json({ error });
    }
  }
}

export default new ImageController();
