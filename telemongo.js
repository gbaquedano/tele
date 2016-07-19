var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function telemongo(){
	console.log("Conectando...");
	mongoose.connect('mongodb://localhost/test');
	console.log("Conectado");
	this.estado = "ESTADO:Conectado";

	this.esquemaDatos = new Schema({
	  grupo:  Number,
	  posicion: Number,
	  fecha:   Number,
	  valor: Number
	});

	this.esquemaDatos.index({grupo: 1, posicion: 1, fecha:1}, {unique: true});
	this.Dato = mongoose.model('Dato', this.esquemaDatos);
}

telemongo.prototype.crearEsquema = function(){

}

module.exports = {
	_cliente: null,
	cliente: function(){
		if(this._cliente == null){
			this._cliente = new telemongo();
		}
		return this._cliente;
	}
}