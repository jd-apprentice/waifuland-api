import { ImageProp } from "../models/interfaces/types";
import Image from "../models/image";
import Tag from "../models/tag";

class ImageRepository {
  async create(image: ImageProp) {
    const tag = new Tag(image.tags);
    await tag.save();
    return Image.create({
      id: image.id,
      url: image.url,
      tags: image.tags,
      source: image.source,
      is_nsfw: image.is_nsfw,
    });
  }

  async get() {
    return Image.find();
  }
}

export default new ImageRepository();
