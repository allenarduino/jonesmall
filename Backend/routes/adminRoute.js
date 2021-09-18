const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin-model");
const multer = require("multer");
const path = require("path");

//Admin signup
router.post("/admin_signup", function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const hashed_password = bcrypt.hashSync(password, 12);
  const user_img = "uploads/avatar.jpg";
  Admin.findOne({ email: email }).then(user => {
    if (user) {
      return res.status(200).json({
        error: "Email already exists"
      });
    } else {
      const newUser = new Admin({
        name: name,
        email: email,
        avatar: user_img,
        password: hashed_password
      });
      newUser
        .save()
        .then(user => {
          res.json({ message: "You are registered sucessfully" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
});

//Admin Login
router.post("/admin_login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  Admin.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      return res.status(200).json({
        error: "User not found"
      });
    }
    //check password
    const password_verified = bcrypt.compareSync(password, user.password);
    if (password_verified) {
      //user matched
      const payload = {
        user_id: user._id
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY);
      res.status(200).json(token);
    } else {
      res.status(200).json({
        error: "Invalid email or password"
      });
    }
  });
});

//Testing
router.get("/view_admin", (req, res) => {
  Admin.find()
    .sort({ date: -1 })
    .then(products => res.json(products));
});

module.exports = router;
