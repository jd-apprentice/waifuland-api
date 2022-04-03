import { Request } from "express";
import multer from "multer";
import boom from "@hapi/boom";

const fileFilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
    return cb(boom.badRequest("Only images are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  dest: "src/assets/images",
  limits: { fileSize: 5000000 },
  fileFilter,
});

export default upload;
