import multer from "multer";

interface MimeTypeMap {
  "image/png": string;
  "image/jpg": string;
  "image/jpeg": string;
}

const MIME_TYPE_MAP: MimeTypeMap = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg"
};

const fileUpload = multer({
  limits: { fileSize: 16000000 },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads/images");
    },
    filename: (req, file, callback) => {
      const ext = MIME_TYPE_MAP[file.mimetype as keyof MimeTypeMap];
      const currentDate = new Date();
      callback(
        null,
        `${req.body?.id}-${file.fieldname}-${currentDate.valueOf()}.${ext}`
      );
    }
  }),
  fileFilter: (req, file, callback) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype as keyof MimeTypeMap];
    if (isValid) {
      callback(null, isValid);
    } else {
      callback(new Error("Invalid mime type"));
    }
  }
});

export default fileUpload;
