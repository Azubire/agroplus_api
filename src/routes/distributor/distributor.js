const express = require("express");
const path = require("path");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/distributors");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

const {
  DistributorController,
} = require("../../controllers/distributor/DistributorController");

router.get("/", DistributorController.index);
router.get("/:id", DistributorController.show);
router.post(
  "/register",
  upload.single("distributor"),
  DistributorController.create
);
router.put("/update/:id", DistributorController.update);
router.delete("/delete/:id");

module.exports = router;
