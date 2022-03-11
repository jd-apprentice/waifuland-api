import randomUrls from "../utils/random";
import Image from "../models/image";
import ImageService from "../services/imageService";
import clearTemporaryFiles from "../utils/clear";

class ImageController {
  async uploadFile(req: any, res: any) {
    try {
      const { file } = req;
      const response = await ImageService.cloudinaryUpload(file.path);
      clearTemporaryFiles(file.path);
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

  async getRandomImage(req: any, res: any) {
    try {
      const { size } = req.query;
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
