var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('Welcome to Corteccia');
});

router.get('/another/route', function(req, res, next) {
  res.json({ hello: 'Welcome to Corteccia' });
});

module.exports = router;