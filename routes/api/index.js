const express = require('express');
const router = express.Router();
const passport = require('passport');
const {check} = require('express-validator/check');

const middleware = require('./middleware');
const login = require('../../controllers/api/auth/login');
const register = require('../../controllers/api/auth/register');
const logout = require('../../controllers/api/auth/logout');

router.use(middleware.start);

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

router.use(middleware.end);

module.exports = router;
