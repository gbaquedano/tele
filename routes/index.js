var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:inicio/:fin/:grupo/:sensor', function(req, res, next) {
  res.render('index', { title: 'Telemetría', inicio: req.params.inicio, fin: req.params.fin, sensor: req.params.sensor, grupo: req.params.grupo });
});

module.exports = router;
