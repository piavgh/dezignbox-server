"use strict";

module.exports = (req, res) => {
    console.log("logged out");
    req.logout();
    res.json({
        success: true
    })
};
