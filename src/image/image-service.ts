// External Modules
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;
import { PathLike } from 'fs';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { LogArgument } from 'rollbar';

// Internal Modules
import { setConfig, setCloudinary } from './config/cloud-config';
import imageRepository from './image-repository';
import { IImage, ImageType } from './interfaces/image-interface';
import { Config, FileMulter } from '../common/interfaces/types';
import { randomUrls } from '../common/utils/random';
import { rollbar } from '../app/config/rollbar';

class ImageService {
  config: Config;
  storage: CloudinaryStorage;

  constructor() {
    this.config = setConfig();
    this.storage = setCloudinary();
  }

  /**
   * @description Uploads the image to Cloudinary
   * @param {FileMulter | PathLike} file - the image to upload
   * @param {string} folder - the folder to upload the image to
   * @param {string} file_name - the name of the image
   * @returns {Promise<ImageType>} - ImageType response
   */
  async cloudinaryUpload(
    file: FileMulter | PathLike | string | undefined,
    folder?: string,
    file_name?: string,
  ): Promise<ImageType> {
    try {
      const response = await cloudinary.uploader.upload(file, {
        folder,
        use_filename: true,
        unique_filename: false,
        filename_override: file_name,
      });
      return response;
    } catch (error: unknown) {
      rollbar.error(error as LogArgument);
      throw new Error((<Error>error).message);
    }
  }

  /**
   * @description Uploads the Image to Cloudinary and saves the image to the database
   * @param {IImage} newImage - The image to upload
   * @return {Promise<IImage>} - A result of uploading the image
   */
  async upload(newImage: IImage): Promise<IImage> {
    try {
      const response = await imageRepository.create(newImage);
      return response;
    } catch (error: unknown) {
      rollbar.error(error as LogArgument);
      throw new Error((<Error>error).message);
    }
  }

  /**
   * @description Get an random image or an array of random images
   * @param {number} size - amount of images to retrieve
   * @param {number} tag_id - the id from the tag to retrieve
   * @return { Promise<IImage[] | IImage> } An array of images or a individual image
   */
  async getImage(size?: number, tag_id?: number): Promise<IImage[] | IImage> {
    try {
      const images = await imageRepository.findImages(tag_id);
      const urls = images.map(image => {
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
      rollbar.error(error as LogArgument);
      throw new Error((<Error>error).message);
    }
  }

  /**
   * @description Get all images without business logic
   * @param {number} tag_id - the id from the tag to retrieve
   * @implements { imageRepository.findImages } - the repository to get the images
   * @return { Promise<IImage[]> } An array of images without business logic
   */
  async getAllImages(tag_id?: number): Promise<IImage[]> {
    try {
      const images = await imageRepository.findImages(tag_id);
      return images;
    } catch (error: unknown) {
      rollbar.error(error as LogArgument);
      throw new Error((<Error>error).message);
    }
  }
}

export default new ImageService();
