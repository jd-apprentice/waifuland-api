const cloudinary = require("cloudinary").v2;
import { Config } from "src/models/interfaces/cloudinary";
import { setConfig, setCloudinary } from "../config/cloud";

class ImageService {
  config: Config;
  storage: any;

  constructor() {
    this.config = setConfig();
    this.storage = setCloudinary();
  }

  async cloudinaryUpload(file: any) {
    try {
      const response = cloudinary.uploader.upload(file, this.config);
      return response;
    } catch (error) {
      return { message: error };
    }
  }
}

export default new ImageService();
