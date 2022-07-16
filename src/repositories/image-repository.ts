import { ImageProp, ImageTypeResponse } from "../models/interfaces/types";
import Image from "../models/image";
import Tag from "../models/tag"
import { AnyObject } from "mongoose";

class ImageRepository {

  /**
   * @description Creates a new Image
   * @param {ImageProp} image
   * @returns {Promise<Image>} 
   */

  async create(image: ImageProp): Promise<void> {
    /** Generates a new Image*/
    const img = new Image(image)
    img.save(() => {
      /** Generates a new Tag */
      const tag = new Tag({...image.tag})
      tag.save()
    });
  }

  /**
   * @description Get a image from the database
   * @returns {Promise<any>}
   */

  async get(): Promise<any> {
    return Image.find();
  }
}

export default new ImageRepository();
