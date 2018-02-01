"use strict";

const passport = require("passport");
const User = require("../../../models/User");

module.exports = (req, res) => {
    User.register(new User({
        username: req.body.email,
        email: req.body.email,
        isActive: true
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('pages/register', {user: user});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
};