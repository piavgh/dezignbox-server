"use strict";

const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    const payload = {
        sub: req.user._id
    };

    // create a token string
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.json({
        token: token,
        currentUser: req.user
    });
};
