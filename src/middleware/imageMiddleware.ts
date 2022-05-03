import { Request } from "express";
import multer from "multer";
import boom, { Boom } from "@hapi/boom";
import { FileMulter } from "src/models/interfaces/types";

/**
 * @description middleware for checking if the user is uploading anything but an image
 * @param { file<File> } req
 * @returns {cb} response with boom
 */

const fileFilter = (req: Request, file: FileMulter, cb: any) => {
  if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
    return cb(boom.badRequest("Only images are allowed"), false);
  }
  cb(null, true);
};

/**
 * @description Some configuration for the upload middelware
 * @param {fileSize} Maximum size for the file
 */

const upload = multer({
  dest: "src/assets/images",
  limits: { fileSize: 5000000 },
  fileFilter,
});

export default upload;
