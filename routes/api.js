var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */

router.get('/set/:horaini/:horafin', function(req, res, next){
	res.json(req.params);
});

router.post('/set/:horaini', function(req, res, next){
//	console.log(req.params);
//	console.log(req);
	console.log(req.params.horaini);
	console.log(req.body.datos);
	res.sendStatus(200);
	fs.writeFile("datos/" + req.params.horaini + ".csv", req.body.datos, function(err){
		if(err == null){
			console.log("Fichero " + req.params.horaini + " guardado OK");
		}else{
			console.log("Error al guardar fichero " + req.params.horaini + ":" + err);
		}
	});
});

router.get('/', function(req, res, next) {
	res.json({'key':'value'});
	//res.send('respond with a resource');
});

module.exports = router;
