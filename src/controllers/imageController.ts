import randomUrls from "../utils/random";
import ImageService from "../services/imageService";
import clearTemporaryFiles from "../utils/clear";
import { Request, Response } from "express";
import { Size } from "../models/interfaces/types";

class ImageController {
  /**
   * @description Upload a file to cloudinary then saves the url on mongodb
   * @param {Request} file.path
   * @returns {Response<string>} A success message with a Json response format
   */

  async uploadFile(
    req: Request,
    res: Response
  ): Promise<Response<string, Record<string, unknown>>> {
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
      clearTemporaryFiles(file?.path ?? "assets/images");
      return res.json({ url: "Imagen guardada correctamente" });
    } catch (error: unknown) {
      return res.json({ message: (<Error>error).message });
    }
  }

  /**
   * @description Get a random waifu from the collection!
   * @param {Request} req body
   * @param {Response} res object
   * @query size
   * @returns {Response<string>} An url with the waifu image hosted in cloudinary
   */
  async getRandomImage(
    req: Request,
    res: Response
  ): Promise<Response<string, Record<string, unknown>>> {
    try {
      const { size } = req.query as unknown as Size;
      const getImages = await ImageService.getImage();
      const urls = getImages.map((image: { url: string }) => image.url);
      const randomArray = urls.sort(randomUrls);
      const sizeArray = randomArray.slice(0, size);
      const randomUrl = urls[Math.floor(Math.random() * urls.length)];
      return res.json(
        size === undefined || null ? { url: randomUrl } : { urls: sizeArray }
      );
    } catch {
      return res.json({ message: "No se pudo encontrar alguna imagen" });
    }
  }

  /**
   * @description Get all images from the database
   * @param { Request } req
   * @param { Response } res
   * @returns { Response<Image> } an array of images
   */

  async getImages(
    req: Request,
    res: Response
  ): Promise<
    Response<
      (new (
        width?: number | undefined,
        height?: number | undefined
      ) => HTMLImageElement)[],
      Record<string, unknown>
    >
  > {
    try {
      const images = await ImageService.getImage();
      return res.json(images);
    } catch (error: unknown) {
      return res.json({ message: (<Error>error).message });
    }
  }
}

export default new ImageController();
