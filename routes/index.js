var express = require('express');
var router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
const authConfig = require('../app').authConfig;

router.use(auth(authConfig)); // Apply the auth middleware

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.openid.user));
});

router.get('/aboutme', (req, res) => {
  res.send('This is a page about me!');
});

router.get('/discoveramagicalworldofpotatoes', (req, res) => {
  res.send('Welcome to the magical world of potatoes!');
});


module.exports = router;
