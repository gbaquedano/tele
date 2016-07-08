var moment = require('moment');
var express = require('express');
var fs = require('fs');
var csv = require('csv');
var glob = require('glob');
var async = require('async');
var router = express.Router();

/* GET users listing. */

router.get('/set/:horaini/:horafin', function(req, res, next){
	res.json(req.params);
});

router.get('/geth/:horaini/:horafin/:grupo/:sensor', function(req, res,next){
	//console.log(req.params.horaini);
	//console.log(req.params.horafin);
	
	glob("datos/*?_*.csv", null, function (er, files) {
		//console.log(er);
		console.log(files);
		var ficheros = [];
		for(var i=0;i<files.length; i++){
			var horas = files[i].split("/")[1].split("_");
			horas[1] = horas[1].split(".csv")[0];
			var fichero = {
				path: files[i],
				inicioRemoto: horas[0],
				inicioLocal: horas[1]
			}
			ficheros.push(fichero);
		}
		var minDef = 292278994; // Max epoch?
		var selectedIni = null;
		var last = null;
		var selected = [];
		for(var i=0;i<ficheros.length; i++){
			if(ficheros[i].inicioRemoto - req.params.horaini < minDef){
				minDef = req.params.horaini - ficheros[i].inicioRemoto;
				selectedIni = ficheros[i];
				console.log(minDef);
			}
		}
		for(var i=0;i<ficheros.length; i++){
			if(true || ficheros[i].inicioRemoto >= selectedIni.inicioRemoto && ficheros[i].inicioRemoto <= req.params.horafin){
				//console.log("Pushed:" + ficheros[i].inicioRemoto + " >= " + selectedIni.inicioRemoto + " && " + ficheros[i].inicioRemoto + " <= " + req.params.horafin);
				selected.push(ficheros[i]);
			}else{
				console.log("Not pushed:" + ficheros[i].inicioRemoto + " >= " + selectedIni.inicioRemoto + " && " + ficheros[i].inicioRemoto + " <= " + req.params.horafin);
			}
		}
var grupo=req.params.grupo;
var sensor=req.params.sensor;
		async.map(selected, function(elem, callback){
			var data = fs.readFileSync(elem.path);
			csv.parse(data, {relax_column_count:true, auto_parse:true}, function(errorCsv, output){
				callback(null, output);
			});
		}, function(err,result){
console.log("sensor, grupo: "+sensor+","+grupo);
			var r = [];
			for(var i=0;i<result.length;i++){
				for(var j=0;j<result[i].length;j++){
					r.push(result[i][j]);				
				}
			}
//console.log("valor a escribir: "+r[1][1]);
			var r2=[];
			for (var k=0;k<r.length;k++){
				if(r[k][1]==grupo){
					r2.push([r[k][0], r[k][parseInt(sensor)+2]]);
				}
			}
			res.json(r2);
		});
	});
	//res.sendStatus(200);
});

router.post('/set/:horaini', function(req, res, next){
//	console.log(req.params);
//	console.log(req);
	console.log(req.params.horaini);
	console.log(req.body.datos);
	res.sendStatus(200);
	fs.writeFile("datos/" + req.params.horaini + "_" + new Date().getTime() + ".csv", req.body.datos, function(err){
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
