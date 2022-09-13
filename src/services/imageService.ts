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
import randomUrls from "../utils/random";

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

  async upload(newImage: ImageProp) {
    try {
      return imageRepository.create(newImage);
    } catch (error: unknown) {
      throw new Error((<Error>error).message);
    }
  }

  /**
   * @description Get images
   * @param size - amount of images to retrieve
   * @return {Promise} An array of images or a individual image
   */

  async getImage(size?: number): Promise<IImage[] | IImage> {
    try {
      const images = await imageRepository.findImages();
      const urls = images.map((image) => {
        return {
          id: image.id,
          url: image.url,
          is_nsfw: image.is_nsfw,
          tag: image.tag,
        };
      });
      const randomArray = urls.sort(randomUrls);
      const sizeArray = randomArray.slice(0, size);
      const randomUrl = urls[Math.floor(Math.random() * urls.length)];
      return size === undefined || null ? randomUrl : sizeArray;
    } catch (error: unknown) {
      throw new Error((<Error>error).message);
    }
  }

  /**
   * @description Get all images without business logic
   * @return {Promise<IImage[]>} An array of images with business logic
   */

  async getAllImages(): Promise<IImage[]> {
    try {
      const images = await imageRepository.findImages();
      return images;
    } catch (error: unknown) {
      throw new Error((<Error>error).message);
    }
  }
}

export default new ImageService();
