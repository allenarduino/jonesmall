const express = require("express");
const router = express.Router();
const multer = require("multer");
const app = express();
const fs = require("fs");
const path = require("path");
const admin_auth = require("../middlewares/admin_auth");
const Product = require("../models/product-model");

//Store uploaded image in a folder
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function(req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

//Create Product
const upload = multer({ storage: storage });
const type = upload.single("product_img");
router.post("/create_product", type, admin_auth, function(req, res) {
  const target_path = req.file.path;
  const name = req.body.name;
  const user_id = req.user_id;
  const price = req.body.price;
  const category = req.body.category;
  // const brand = req.body.brand;
  const description = req.body.description;

  const newProduct = new Product({
    user: user_id,
    name: name,
    image: target_path,
    price: price,
    category: category,
    // brand: brand,
    description: description
  });
  newProduct
    .save()
    .then(product => {
      res.status(200).json({ message: "Product Created Sucessfully" });
    })
    .catch(err => res.status(500).json(err));
});

// For displaying products on homepage
router.get("/products", (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then(products => res.json(products))
    .catch(err => res.status(500).json(err));
});

//For deleting a product
router.delete("/product/:id", (req, res) => {
  Product.deleteOne({ _id: req.params.id }).then(products =>
    res
      .json({ message: "Product Deleted" })
      .catch(err => res.status(500).json(err))
  );
});

module.exports = router;
