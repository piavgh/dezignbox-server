"use strict";

const config = require('../../../config/config');

module.exports = (req, res) => {
    res.render('pages/register', {
        config: config
    });
};