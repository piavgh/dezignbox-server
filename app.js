const express = require('express');
const cors = require('cors');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

// Use CORS
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'dezign_box',
    resave: false,
    saveUninitialized: false
}));

require('./config/config');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

app.use(passport.initialize());
app.use(passport.session());

const User = require("./models/User");
const Campaign = require("./models/Campaign");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Check authentication
const authCheckMiddleware = require('./routes/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const middleware = require('./routes/middleware');

app.use(middleware.start);

app.use('/auth', authRoutes);
app.use('/api/v1', apiRoutes);

app.use(middleware.end);

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
    res.error(err);
});

module.exports = app;
