// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require("cloudinary").v2;
import { PathLike } from "fs";
import {
  Config,
  FileMulter,
  IImage,
  ImageProp,
} from "../models/interfaces/types";
import { setConfig, setCloudinary } from "../config/cloud";
import { ImageType } from "../models/interfaces/types";
import imageRepository from "../repositories/image-repository";
import { CloudinaryStorage } from "multer-storage-cloudinary";

class ImageService {
  config: Config;
  storage: CloudinaryStorage;

  constructor() {
    this.config = setConfig();
    this.storage = setCloudinary();
  }

  /**
   * @description Uploads the image to Cloudinary
   * @param {FileMulter | PathLike} file
   * @returns {Promise<ImageType>} - ImageType response
   */

  async cloudinaryUpload(
    file: FileMulter | PathLike | string | undefined
  ): Promise<ImageType> {
    try {
      const response = cloudinary.uploader.upload(file, this.config);
      return response;
    } catch (error: unknown) {
      throw new Error((<Error>error).message);
    }
  }

  /**
   * @description Uploads the Image
   */

  async upload(newImage: ImageProp): Promise<ImageProp> {
    try {
      return imageRepository.create(newImage);
    } catch (error: unknown) {
      throw new Error((<Error>error).message);
    }
  }

  /**
   * @description Get images
   */

  async getImage(): Promise<IImage[]> {
    try {
      return imageRepository.findImages();
    } catch (error: unknown) {
      throw new Error((<Error>error).message);
    }
  }
}

export default new ImageService();
