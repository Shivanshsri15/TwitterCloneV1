import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.filename}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadingImages = upload.array("images", 5);

router.post("/", (req, res) => {
  uploadingImages(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message });
    }
    const filePaths = req.files.map((file) => file.path);
    // console.log('File paths:', filePaths);

    res
      .status(200)
      .json({ message: "Image uploaded successfully", filePaths: filePaths });
    // res.status(200).send({
    //   message: "Image uploaded successfully",
    //   image: `/${req.file.path}`,
    // });
  });
});

export default router;
