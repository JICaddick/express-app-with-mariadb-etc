const { auth, requiresAuth } = require('express-openid-connect');
const dotenv = require('dotenv');

dotenv.config();

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.baseURL,
  clientID: process.env.clientID,
  issuerBaseURL: process.env.issuerBaseURL,
  secret: process.env.secret,
};

// console.log(process.env.secret);
// console.log(process.env.baseURL);
// console.log(process.env.clientID);
// console.log(process.env.issuerBaseURL);

const router = express.Router();

// the following router.use was in there originally.
router.use(auth(authConfig));

// Attempt #1 (with const authconfig) auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(authConfig));

// req.isAuthenticated is provided from the auth router

router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/login', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.openid.user));
});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


import indexRouter from './routes/index';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

router.get('/login', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.openid.user));
});

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/aboutme', indexRouter);
app.use('/discoveramagicalworldofpotatoes', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = router;