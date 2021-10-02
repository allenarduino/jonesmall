const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const multer = require("multer");
const path = require("path");
const user_auth = require("../middlewares/user_auth");

router.post("/register", function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const hashed_password = bcrypt.hashSync(password, 12);
  const user_img = "uploads/avatar.jpg";
  User.findOne({ email: email }).then(user => {
    if (user) {
      return res.status(200).json({
        error: "Email already exists"
      });
    } else {
      const newUser = new User({
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

//User Login
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
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
        user_id: user.id
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

//For fetching user details
router.get("/fetch_user", user_auth, (req, res) => {
  const auth_user_id = req.user_id;
  User.find({ _id: auth_user_id })
    .sort({ date: -1 })
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
