import { CloudinaryStorage } from "multer-storage-cloudinary";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require("cloudinary").v2;
import Config from "./config";

function setConfig() {
  return cloudinary.config({
    cloud_name: Config.cloudinary.name,
    api_key: Config.cloudinary.key,
    api_secret: Config.cloudinary.secret,
  });
}

function setCloudinary() {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
  });
}

export { setConfig, setCloudinary };
