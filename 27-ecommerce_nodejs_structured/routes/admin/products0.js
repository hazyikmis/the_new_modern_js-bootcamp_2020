const express = require("express");
const { validationResult } = require("express-validator");
const multer = require("multer");

const productsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
const { requireTitle, requirePrice } = require("./validators");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", (req, res) => {});

router.get("/admin/products/new", (req, res) => {
  res.send(productsNewTemplate({}));
});

//router.post("/admin/products/new", [requireTitle, requirePrice], (req, res) => {
router.post(
  "/admin/products/new",
  upload.single("image"), //new middleware, added after multer. AND THIS SHOULD BE ADDED BEFORE VALIDATION MIDDLEWARE, OTHERWISE {title, price} CANNOT BE EXTRACTED FOM req.body
  [requireTitle, requirePrice],
  async (req, res) => {
    const errors = validationResult(req);
    //console.log(errors);

    if (!errors.isEmpty()) {
      return res.send(productsNewTemplate({ errors }));
    }

    //console.log(req.body);
    // req.on("data", data => {
    //   console.log(data.toString());
    // });
    //console.log(req.file);
    //console.log(req.file.buffer.toString("base64")); //do not try this for big image files!
    const image = req.file.buffer.toString("base64");
    const { title, price } = req.body;

    await productsRepo.create({ title, price, image });

    res.send("submitted");
  }
);

module.exports = router;
