"use strict";

module.exports = {
    start: (req, res, next) => {
        req.setLocale('vi');
        next();
    },

    isAuthenticated: (req, res, next) => {
        if (req.user) {
            return next();
        }
        return res.redirect('/login');
    },

    end: (req, res, next) => {
        next();
    }
};