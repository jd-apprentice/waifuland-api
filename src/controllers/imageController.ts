import randomUrls from "../utils/random";
import Image from "../models/image";
import ImageService from "../services/imageService";
import clearTemporaryFiles from "../utils/clear";
import { Request, Response } from "express";
import { FileRequest, ImageProps, Size } from "../models/interfaces/types";

class ImageController {
  /**
   * @description Upload a file to cloudinary then saves the url on mongodb
   * @param {Request} file.path
   * @returns {Response<string>} A success message with a Json response format
   */

  async uploadFile(
    req: Request,
    res: Response
  ): Promise<Response<string, Record<string, any>>> {
    try {
      const { file }: FileRequest = req;
      const { tag, source, is_nsfw } = req.body;
      const response = await ImageService.cloudinaryUpload(file?.path!);
      const { public_id, secure_url } = response;
      const image: ImageProps = new Image({
        source,
        is_nsfw,
        tag,
        id: public_id,
        url: secure_url,
      });
      clearTemporaryFiles(file?.path!);
      await image.save();
      return res.json({ url: "Imagen guardada correctamente" });
    } catch (error: unknown) {
      return res.json({ message: error });
    }
  }

  /**
   * @description Get a random waifu from the collection!
   * @query size
   * @returns {Response<string> || Response[]<string>} An url with the waifu image hosted in cloudinary
   */

  async getRandomImage(
    req: Request,
    res: Response
  ): Promise<Response<string, Record<string, any>>> {
    try {
      const { size } = req.query as unknown as Size;
      const getImages = await Image.find();
      const urls = getImages.map((image) => image.url);
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
}

export default new ImageController();
