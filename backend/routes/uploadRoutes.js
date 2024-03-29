import path from "path";
import express from "express";
import multer from "multer";
import { error } from "console";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && filetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), flase);
  }
};

const upload = multer({ storage, fileFilter });
const uploadStringleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadStringleImage(req, res, (err) => {
    if (err) {
      res.status(404).send({ messgae: err.message });
    } else if (req.file) {
      res.status(200).send({
        messgae: "Image uploaded successfully",
        image: `/${req.file.path}`,
      });
    }
    else{
        res.status(400).send({messgae: "No image file provided"})
    }
  });
});

export default router;
