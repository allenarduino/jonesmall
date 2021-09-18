const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const admin_auth = require("../middlewares/admin_auth");
const Category = require("../models/category-model");

//Store uploaded image in a folder
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function(req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

//Create Product Category
const upload = multer({ storage: storage });
const type = upload.single("category_img");
router.post("/create_category", type, admin_auth, function(req, res) {
  const target_path = req.file.path;
  const name = req.body.name;
  const user_id = req.user_id;
  console.log(target_path);

  const newCategory = new Category({
    user: user_id,
    name: name,
    image: target_path
  });
  newCategory
    .save()
    .then(category => {
      res.status(200).json({ message: "Category Created Sucessfully" });
    })
    .catch(err => res.status(500).json(err));
});

// For displaying product categories
router.get("/categories", (req, res) => {
  Category.find()
    .sort({ date: -1 })
    .then(categories => res.json(categories))
    .catch(err => res.status(500).json(err));
});

//For deleting a product category
router.delete("/category/:id", (req, res) => {
  Product.deleteOne({ _id: req.params.id }).then(categories =>
    res
      .json({ message: "Category Deleted" })
      .catch(err => res.status(500).json(err))
  );
});

module.exports = router;
