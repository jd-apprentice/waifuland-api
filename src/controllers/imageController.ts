import randomUrls from "../utils/random";
import Image from "../models/image";
import ImageService from "../services/imageService";
import clearTemporaryFiles from "../utils/clear";
import { Request, Response } from "express";

class ImageController {
  async uploadFile(req: Request, res: Response) {
    try {
      const { file } = req;
      const response = await ImageService.cloudinaryUpload(file?.path);
      // @ts-ignore
      clearTemporaryFiles(file?.path);
      const image = new Image({
        public_id: response.public_id,
        url: response.secure_url,
      });
      await image.save();
      return res.json({ url: "Imagen guardada correctamente" });
    } catch (error) {
      return res.json({ message: error });
    }
  }

  async getRandomImage(req: Request, res: Response) {
    try {
      const { size }: any = req.query;
      const getImages = await Image.find()
      const urls = getImages.map(image => image.url);
      const randomArray = (urls.sort(randomUrls))
      const sizeArray = randomArray.slice(0, size);
      const randomUrl = urls[Math.floor(Math.random() * urls.length)];
      return res.json( size === undefined || null ? { url: randomUrl } : { urls: sizeArray } );
    } catch {
      return res.json({ message: "No se pudo encontrar alguna imagen" });
    }
  }
}

export default new ImageController();
