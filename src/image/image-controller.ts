// External Modules
import { Request, Response } from "express";

// Interal Modules
import clearTemporaryFiles from "../common/utils/clear";
import ImageService from "./image-service";
import { Query } from "../common/interfaces/types";

class ImageController {
  /**
   * @description Upload a file to cloudinary then saves the url on mongodb
   * @param { Request } req.body - tag, source, is_nsfw
   * @param { Request } file.path - path to the file
   * @returns { Promise<Response> } A success message with a Json response format
   */

  async uploadFile(req: Request, res: Response): Promise<Response> {
    try {
      const { file } = req;
      const { tag, source, is_nsfw } = req.body;
      const response = await ImageService.cloudinaryUpload(file?.path);
      const { public_id, secure_url } = response;
      ImageService.upload({
        source,
        is_nsfw,
        id: public_id,
        url: secure_url,
        tag,
      });
      clearTemporaryFiles(file?.path ?? "image/assets/images");
      return res.json({ url: "Imagen guardada correctamente" });
    } catch (error: unknown) {
      return res.json({ message: (<Error>error).message });
    }
  }

  /**
   * @description Get a random waifu from the collection!
   * @param { Response } res object with the waifu
   * @query size - number of items to retrieve
   * @query tag_id - tag to filter
   * @returns { Promise<Response> } An url with the waifu image hosted in cloudinary
   */
  async getRandomImage(req: Request, res: Response): Promise<Response> {
    try {
      const { size, tag_id } = req.query as unknown as Query;
      const getImages = await ImageService.getImage(size, tag_id);
      return res.json(getImages);
    } catch {
      return res.json({ message: "No se pudo encontrar alguna imagen" });
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
      const { tag_id } = req.query as unknown as Query;
      const images = await ImageService.getAllImages(tag_id);
      return res.json(images);
    } catch (error: unknown) {
      return res.json({ message: (<Error>error).message });
    }
  }
}

export default new ImageController();
