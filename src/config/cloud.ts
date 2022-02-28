import { CloudinaryStorage } from "multer-storage-cloudinary";
const cloudinary = require("cloudinary").v2;

function setConfig() {
  return cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
  });
}

function setCloudinary() {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
  });
}

export { setConfig, setCloudinary };