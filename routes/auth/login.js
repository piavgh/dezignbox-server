"use strict";

const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const payload = {
    sub: req.user._id
  };

  // create a token string
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7 days"
  });

  return res.success({
    token: token,
    currentUser: req.user
  });
};
