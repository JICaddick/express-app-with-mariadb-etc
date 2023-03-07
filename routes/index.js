var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/aboutme', (req, res) => {
  res.send('This is a page about me!');
});

router.get('/discoveramagicalworldofpotatoes', (req, res) => {
  res.send('Welcome to the magical world of potatoes!');
});


module.exports = router;
