"use strict";

const passport = require("passport");
const {validationResult} = require('express-validator/check');

const User = require("../../models/User");

module.exports = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({});
  }

  User.register(new User({
    username: req.body.email,
    email: req.body.email,
    isActive: true
  }), req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.json({
        success: false
      });
    }

    passport.authenticate('local')(req, res, function () {
      return res.success();
    });
  });
};
