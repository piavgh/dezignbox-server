"use strict";

const passport = require("passport");
const i18n = require('i18n');
const {validationResult} = require('express-validator/check');

const User = require("../../../models/User");

module.exports = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/register');
    }

    User.register(new User({
        username: req.body.email,
        email: req.body.email,
        isActive: true
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            req.flash('error', err.message);
            return res.redirect('/register');
        }

        passport.authenticate('local')(req, res, function () {
            req.flash('success', i18n.__('loginSuccess'));
            return res.redirect('/');
        });
    });
};