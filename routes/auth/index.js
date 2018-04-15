const express = require('express');
const router = express.Router();
const passport = require('passport');
const {check} = require('express-validator/check');

const login = require('./login');
const register = require('./register');
const logout = require('./logout');

// route for register action
router.post('/register', [
    check('email')
        .exists()
        .isEmail().withMessage('Email Invalid')
        .trim()
        .normalizeEmail(),

    check('password')
        .exists()
        .isLength({min: 8}).withMessage('Password Invalid')
        .matches(/\d/).withMessage('Password Invalid')
], register);

// route for login action
router.post('/login', passport.authenticate('local', {
    session: false
}), login);

// route for logout action
router.get('/logout', logout);

module.exports = router;
