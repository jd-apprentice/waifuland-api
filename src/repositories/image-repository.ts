import { IImage } from "../models/interfaces/types";
import Image from "../models/image";

class ImageRepository {
  /**
   * @description Creates a new Image
   * @param {ImageProp} image
   */

  async create(image: IImage): Promise<IImage> {
    return Image.create(image);
  }

  /**
   * @description Get all images from the database
   */

  async findImages(): Promise<IImage[]> {
    return Image.find();
  }
}

export default new ImageRepository();
