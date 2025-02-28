// External Modules
import { Types } from 'mongoose';

// Internal Modules
import Image from './schema/image-schema';
import Tag from 'src/tag/schema/tag-schema';
import { hasTag } from 'src/common/utils/ref';
import { ImageProp } from './interfaces/image-interface';
import { rollbar } from 'src/app/config/rollbar';

class ImageRepository {
  /**
   * @description Creates a new Image in the database
   * @param { ImageProp } image - the image to create in the database
   * @return { Promise<ImageProp> } - A new image created
   */
  async create(image: ImageProp): Promise<ImageProp> {
    const sanitizedTagId = image.tag.toString().trim();
    if (!Types.ObjectId.isValid(sanitizedTagId)) {
      rollbar.error('Invalid tag id');
      throw new Error('Invalid tag id');
    }

    const tagExists = await Tag.findOne({ tag_id: sanitizedTagId });
    const _idTag = tagExists?._id;

    return Image.create({
      ...image,
      tag: _idTag ?? image.tag,  // Use validated tag or fallback
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
