var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/set/:horaini/:horafin', function(req, res, next){
	res.json(req.params);
});

router.post('/set/:horaini', function(req, res, next){
	console.log(req.params);
	console.log(req);
	res.sendStatus(200);
});

router.get('/', function(req, res, next) {
	res.json({'key':'value'});
	//res.send('respond with a resource');
});

module.exports = router;
