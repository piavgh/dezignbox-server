"use strict";

var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}

const i18n = require('i18n');

let Configs = {
    siteTitle: i18n.__('siteTitle')
};

module.exports = Configs;