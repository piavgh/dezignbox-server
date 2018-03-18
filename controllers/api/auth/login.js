"use strict";

module.exports = (req, res) => {
    return res.json({
        currentUser: req.user
    });
};
