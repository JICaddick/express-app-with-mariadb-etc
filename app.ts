// import { auth, requiresAuth } from 'express-openid-connect';
// import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index';

// const express = require('express');
// const indexRouter = require('./routes/index');
// const auth = require('express-openid-connect');
// const dotenv = require('dotenv');
// const requiresAuth = require('express-openid-connect').requiresAuth;

// dotenv.config();

// const authConfig = {
//   authRequired: false,
//   auth0Logout: true,
//   baseURL: process.env.baseURL,
//   clientID: process.env.clientID,
//   issuerBaseURL: process.env.issuerBaseURL,
//   secret: process.env.secret,
// };

// const router = express.Router();

// the following router.use was in there originally.
// router.use(auth(authConfig));

// Attempt #1 (with const authconfig) auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(authConfig));

// req.isAuthenticated is provided from the auth router

// router.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// router.get('/login', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.openid.user));
// });

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router.get('/login', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.openid.user));
// });

app.use('/', router);
// app.use('/users', usersRouter);
app.use('/login', router);
app.use('/aboutme', router);
app.use('/discoveramagicalworldofpotatoes', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// set locals, only providing error in development
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = router;