// External Modules
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require("cloudinary").v2;
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Internal Modules
import { Config } from "../../app/config/config";

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
