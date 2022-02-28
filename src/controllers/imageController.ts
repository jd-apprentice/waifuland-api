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

  async getFiles(req: any, res: any) {
    try {
      const image = await Image.find();
      return res.json(image);
    } catch {
      return res.json({ message: "No se pudo encontrar alguna imagen" });
    }
  }
}

export default new ImageController();
