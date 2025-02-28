// Internal Modules
import Image from './schema/image-schema';
import Tag from '../tag/schema/tag-schema';
import { hasTag } from '../common/utils/ref';
import { ImageProp } from './interfaces/image-interface';

class ImageRepository {
  /**
   * @description Creates a new Image in the database
   * @param { ImageProp } image - the image to create in the database
   * @return { Promise<ImageProp> } - A new image created
   */
  async create(image: ImageProp): Promise<ImageProp> {
    const tagExists = await Tag.findOne({ tag_id: { $eq: image.tag } });
    const _idTag = tagExists?._id;
    return Image.create({
      ...image,
      tag: _idTag ?? image.tag,
    });
  }

  /**
   * @description Get all images from the database
   * @param tag_id - the id from the tag to retrieve
   * @return { Promise<ImageProp[]> } An array of images
   */
  async findImages(tag_id?: number): Promise<ImageProp[]> {
    const images = await Image.find().populate(hasTag(tag_id));
    return images.filter(image => image.tag !== null);
  }
}

export default new ImageRepository();
