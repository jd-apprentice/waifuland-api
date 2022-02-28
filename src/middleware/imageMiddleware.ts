import multer from "multer";

const fileFilter = () => {
    // TODO: validate file type
};

const upload = multer({
  dest: "src/assets/images",
  limits: { fileSize: 5000000 }
});

export default upload;
