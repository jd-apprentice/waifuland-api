import { ImageProp } from "../models/interfaces/types";
import Image from "../models/image";

class ImageRepository {
  async create(image: ImageProp) {
    return Image.create(image);
  }

  async get() {
    return Image.find();
  }
}

export default new ImageRepository();
