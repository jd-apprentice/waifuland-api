const cloudinary = require("cloudinary").v2;
import { PathLike } from "fs";
import {
  Config,
  FileMulter,
  ImageProp,
  ImageTypeResponse,
} from "../models/interfaces/types";
import { setConfig, setCloudinary } from "../config/cloud";
import { ImageType } from "../models/interfaces/types";
import Image from "../models/image";

class ImageService {
  config: Config;
  storage: any;

  constructor() {
    this.config = setConfig();
    this.storage = setCloudinary();
  }

  async cloudinaryUpload(file: FileMulter | PathLike): Promise<ImageType> {
    try {
      const response = cloudinary.uploader.upload(file, this.config);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async upload(newImage: ImageProp) {
    try {
      const { source, is_nsfw, tag, url, id } = newImage;
      const image = new Image({
        source,
        is_nsfw,
        tag,
        id,
        url,
      });
      await image.save();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getImage(): Promise<ImageTypeResponse[]> {
    try {
      const images = await Image.find();
      return images;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new ImageService();
