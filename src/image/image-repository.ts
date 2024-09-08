// Internal Modules
import Image from './schema/image-schema';
import Tag from '../tag/schema/tag-schema';
import { hasTag } from '../common/utils/ref';
import { IImage } from './interfaces/image-interface';

class ImageRepository {
  /**
   * @description Creates a new Image in the database
   * @param {IImage} image - the image to create in the database
   * @return { Promise<IImage> } - A new image created
   */
  async create(image: IImage): Promise<IImage> {
    const tagExists = await Tag.findOne({ tag_id: image.tag.tag_id });
    const _idTag = tagExists?._id;
    return Image.create({
      ...image,
      tag: _idTag ?? image.tag,
    });
  }

  /**
   * @description Get all images from the database
   * @param tag_id - the id from the tag to retrieve
   * @return { Promise<IImage[]> } An array of images
   */
  async findImages(tag_id?: number): Promise<IImage[]> {
    const images = await Image.find().populate(hasTag(tag_id));
    return images.filter(image => image.tag !== null);
  }
}

export default new ImageRepository();
