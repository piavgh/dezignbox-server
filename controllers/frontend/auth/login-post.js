"use strict";

module.exports = (req, res) => {
    res.json({
        currentUser: req.user
    });
};
