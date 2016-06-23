var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:inicio/:fin', function(req, res, next) {
  res.render('index', { title: 'Telemetría', inicio: req.params.inicio, fin: req.params.fin });
});

module.exports = router;
