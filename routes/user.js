const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require('../models/user');
const checkAuth = require('../middleware/auth');

const router = express.Router();

router.post("/register", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            phone: req.body.phone,
            password: hash
        });
        user.save().then(result => {
            res.status(201).json({
                message: 'User created',
                result: result
            });
        });
    });
});

router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ userName: req.body.userName })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
        if (!result) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        const token = jwt.sign(
          { userName: fetchedUser.userName, userId: fetchedUser._id },
          "secret_this_should_be_longer",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600
        });
      })
      .catch(err => {
        return res.status(401).json({
          message: "Auth failed"
        });
      });
  });

  router.get("/:id", (req, res, next) => {
    User.findById(req.params.id).then(user => {
      if (user) {
        res.status(200).json({
          id: user._id,
          userName: user.userName,
          email: user.email,
          phone: user.phone
        });
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    });
  });

  router.get("",checkAuth, (req, res, next) => {
    User.findById(req.userData.userId).then(user => {
      if (user) {
        const id = req.userData.userId;
        res.status(200).json({
          id: id,
          userName: user.userName,
          email: user.email,
          phone: user.phone
        });
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    });
  });

module.exports = router;
