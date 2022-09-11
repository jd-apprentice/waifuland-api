import { IImage, ImageProp } from "../models/interfaces/types";
import Image from "../models/image";
import { HydratedDocument } from "mongoose";

class ImageRepository {
  /**
   * @description Creates a new Image
   * @param {ImageProp} image
   */

  async create(image: ImageProp): Promise<IImage> {
    const img = new Image(image);
    return img.save();
  }

  /**
   * @description Get all images from the database
   */

  async findImages(): Promise<HydratedDocument<IImage, any>> {
    return Image.find();
  }
}

export default new ImageRepository();
