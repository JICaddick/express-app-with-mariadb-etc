// NEEDED? const indexRouter = require('./routes/index'); NEEDED? 

// const router = express.Router(); now in routes/index.js as const router = Router(); using const { Router } = require('express'); on line 1

// const requiresAuth = require('express-openid-connect').requiresAuth; and const auth = require('express-openid-connect'); now in routes/index.js as `const { auth, requiresAuth } = require('express-openid-connect');`
// const express = require('express'); moved to routes/index.js as const { Router } = require('express');
// import { auth, requiresAuth } from 'express-openid-connect'; moved to routes/index.js as const { auth, requiresAuth } = require('express-openid-connect');

// const authConfig and dotenv.config(); moved to routes/index.ts
// the following `router.use(auth(authConfig))` was in there originally.
// req.isAuthenticated is provided from the auth router

import express from 'express';
import router from './routes/index';

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// NEEDED?  app.use('/', indexRouter); app.use('/users', usersRouter); NEEDED? 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);
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