const express = require('express');
const router = express.Router();
const passport = require('passport');
const {check} = require('express-validator/check');
const i18n = require('i18n');

const middleware = require('./middleware');
const home = require('../../controllers/frontend/home');
const login = require('../../controllers/frontend/auth/login');
const loginPost = require('../../controllers/frontend/auth/login-post');
const register = require('../../controllers/frontend/auth/register');
const registerPost = require('../../controllers/frontend/auth/register-post');
const logout = require('../../controllers/frontend/auth/logout');

router.use(middleware.start);

// restrict index for logged in user only
router.get('/', home);

// route to register page
router.get('/register', register);

// route for register action
router.post('/register', [
    check('email')
        .exists()
        .isEmail().withMessage(i18n.__('emailInvalid'))
        .trim()
        .normalizeEmail(),

    check('password')
        .exists()
        .isLength({min: 8}).withMessage(i18n.__('passwordInvalid'))
        .matches(/\d/).withMessage(i18n.__('passwordInvalid'))
], registerPost);

// route to login page
router.get('/login', login);

// route for login action
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}), loginPost);

// route for logout action
router.get('/logout', logout);

router.use(middleware.end);

module.exports = router;
