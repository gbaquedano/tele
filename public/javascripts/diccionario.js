var diccionario = {
	1:{
		0:"Segundos encendido",
		1:"Main PW Bank 1",
		2:"Main PW Bank 2",
		3:"RPM"
	},
	2:{
		0:"Avance de encendido final",
		1:"Bitfield of batch fire injector events",
		2:"Bitfield de estado de motor",
		3:"Bank 1 AFR target",
		4:"Bank 2 AFR target"
	},
	3:{
		0:"Presión atmosférica",
		1:"Presión de aire del colector",
		2:"Tª de aire en el colector",
		3:"Tª de refrigerante"
	},
	4:{
		0:"Posición del acelerador",
		1:"Voltaje de batería",
		2:"AFR 1",
		3:"AFR 2"
	},
	10:{
		0:"Voltaje de O2#1",
		1:"Voltaje de O2#2",
		2:"Tiempo de carga de la bobina principal",
		3:"Tiempo de carga de la bobina secundario"
	},
	12:{
		0:"Carga de combustible en tabla modificada",
		1:"Carga usada en la tabla de ignición",
		2:"Carga usada en la tabla de ignición modificada",
		3:"Tª de aire entrante estimada"
	},
	43:{
		0:"Velocidad de vehículo 1",
		1:"Velocidad de vehículo 2",
		2:"Velocidad de vehículo 3",
		3:"Velocidad de vehículo 4"
	},
	51:{
		0:"Aceleración basada en MAPdot",
		1:"Aceleración total",
		2:"Timer de retraso en control de lanzamiento",
		3:"Retraso del control de lanzamiento"
	},
	53:{
		0:"Bitfield de CAN1",
		1:"Bitfield de CAN2",
		2:"Bitfield de CAN3",
		3:"Knock retard",
		4:"Flujo de combustible medio",
		5:"Consumo de combustible medio"
	},
	54:{
		0:"Presión de combustible 1",
		1:"Presión de combustible 2",
		2:"Tª de combustible 1",
		3:"Tª de combustible 2"
	}
}

console.log(diccionario[0][4]);
