var express = require('express');
var router = express.Router();
var moment=require('moment');

/* //GET home page. 
router.get('/:inicio/:fin/:grupo/:sensor', function(req, res, next) {
  res.render('index', { title: 'Telemetría', inicio: req.params.inicio, fin: req.params.fin, sensor: req.params.sensor, grupo: req.params.grupo });
});
*/

router.get('/unixtimes/:inicio/:fin/', function(req, res, next) {
  res.render('index', { title: 'Telemetría', inicio: req.params.inicio, fin: req.params.fin});
});

router.get('/:inicio/:fin/', function(req, res, next) {
  console.log(moment(req.params.inicio, "DD-MM-YYYY-HH-mm-ss").milliseconds());
  res.render('index', { title: 'Telemetría', inicio: moment(req.params.inicio, "DD-MM-YYYY-HH-mm-ss").milliseconds(), fin: req.params.fin});
});

module.exports = router;
