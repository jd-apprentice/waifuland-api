// External Modules
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require("cloudinary").v2;
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Internal Modules
import { Config } from "src/app/config/config";
import { rollbar } from "src/app/config/rollbar";

function setConfig() {

  const errorMessage = "Missing cloudinary configuration";

  if (!Config.cloudinary.name || !Config.cloudinary.key || !Config.cloudinary.secret) {
    rollbar.error(errorMessage);
    console.error(errorMessage);
    process.exit(1);
  }

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
