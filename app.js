const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const flash = require('express-flash');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const i18n = require("i18n");
mongoose.Promise = global.Promise;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

i18n.configure({
    locales:['vi', 'en'],
    directory: __dirname + '/locales',
    //define the default language
    defaultLocale: 'vi',
    // define a custom cookie name to parse locale settings from
    cookie: 'i18n'
});

app.use(session({
    secret: 'dezign_box',
    resave: false,
    saveUninitialized: false
}));

//init i18n after cookie-parser
app.use(i18n.init);

app.use(flash());

require('./config/config');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

app.use(passport.initialize());
app.use(passport.session());

const User = require("./models/User");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', require('./routes/frontend/index'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('pages/error', {
        req: req
    });
});

module.exports = app;
