"use strict";

const i18n = require('i18n');

module.exports = (req, res) => {
    req.flash('success', i18n.__('loginSuccess'));
    res.redirect('/');
};