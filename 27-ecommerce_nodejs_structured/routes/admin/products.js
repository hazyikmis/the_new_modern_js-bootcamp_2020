const express = require("express");
//const { validationResult } = require("express-validator"); //commented after adding "const { handleErrors } = require("./middlewares");"
const multer = require("multer");

const productsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
const productsIndexTemplate = require("../../views/admin/products/index");
const productsEditTemplate = require("../../views/admin/products/edit");
const { requireTitle, requirePrice } = require("./validators");
const { handleErrors, requireAuth } = require("./middlewares");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", requireAuth, async (req, res) => {
  // if (!req.session.userID) {
  //   return res.redirect("/signin");
  // }
  const products = await productsRepo.getAll();
  res.send(productsIndexTemplate({ products }));
});

router.get("/admin/products/new", requireAuth, (req, res) => {
  res.send(productsNewTemplate({}));
});

//router.post("/admin/products/new", [requireTitle, requirePrice], (req, res) => {
router.post(
  "/admin/products/new",
  requireAuth,
  upload.single("image"), //new middleware, added after multer. AND THIS SHOULD BE ADDED BEFORE VALIDATION MIDDLEWARE, OTHERWISE {title, price} CANNOT BE EXTRACTED FOM req.body
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  async (req, res) => {
    /* 
    //this section completely commented because of "handleErrors" middleware
    const errors = validationResult(req);
    //console.log(errors);

    if (!errors.isEmpty()) {
      return res.send(productsNewTemplate({ errors }));
    }
    */

    //console.log(req.body);
    // req.on("data", data => {
    //   console.log(data.toString());
    // });
    //console.log(req.file);
    //console.log(req.file.buffer.toString("base64")); //do not try this for big image files!
    const image = req.file.buffer.toString("base64");
    const { title, price } = req.body;

    await productsRepo.create({ title, price, image });

    //res.send("submitted");
    res.redirect("/admin/products");
  }
);

router.get("/admin/products/:id/edit", requireAuth, async (req, res) => {
  //console.log(req.params.id);
  const product = await productsRepo.getOne(req.params.id);
  if (!product) {
    return res.send("Product not found!");
  }
  res.send(productsEditTemplate({ product }));
});

router.post(
  "/admin/products/:id/edit",
  requireAuth,
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(productsEditTemplate, async req => {
    const product = await productsRepo.getOne(req.params.id);
    return { product };
  }),
  async (req, res) => {
    const changes = req.body;

    if (req.file) {
      changes.image = req.file.buffer.toString("base64");
    }

    try {
      await productsRepo.update(req.params.id, changes);
    } catch (err) {
      return res.send("Could not find item!");
    }

    res.redirect("/admin/products");
  }
);

router.post("/admin/products/:id/delete", requireAuth, async (req, res) => {
  await productsRepo.delete(req.params.id);
  res.redirect("/admin/products");
});

module.exports = router;
