"use strict";

module.exports = (req, res) => {
    res.render('pages/index', {user: req.user});
};