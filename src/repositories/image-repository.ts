import { IImage, ImageProps } from "../models/interfaces/types";
import Image from "../models/image";
import Tag from "../models/tag";

class ImageRepository {
  /**
   * @description Creates a new Image
   * @param {IImage} image - the image to create
   */

  async create(image: IImage) {
    const tagExists = await Tag.findOne({ tag_id: image.tag.tag_id });
    const _idTag = tagExists?._id;
    return Image.create({
      ...image,
      tag: _idTag ?? image.tag,
    });
  }

  /**
   * @description Get all images from the database
   */

  async findImages(): Promise<ImageProps[]> {
    return Image.find().populate({
      path: "tag",
      select: "-_id",
    });
  }
}

export default new ImageRepository();
