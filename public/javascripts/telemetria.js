var telemetria = angular.module('telemetria',[]);

telemetria.controller('graficarCtrl', function($scope, $http) {
	$scope.greeting = 'Hola!';
	$scope.graficados = [];
	$http.get('/javascripts/diccionario.json').then(function(res){
		$scope.diccionario = res.data;
		$scope.diccionarioObj = [];
		var keys = Object.keys($scope.diccionario);
		for(var i = 0; i < keys.length; i++){
			console.log($scope.diccionario[keys[i]]);
			var values = Object.keys($scope.diccionario[keys[i]]);
			for(var j = 0; j < values.length; j++){
				$scope.diccionarioObj.push({ id_trama:keys[i], offset: values[j] , nombre: $scope.diccionario[keys[i]][values[j]] });
			}
		}
		console.log($scope.diccionarioObj);
	});
	$scope.addSensors = function(sensores){
		console.log(sensores);
		for(var i = 0; i < sensores.length; i++){
			$scope.graficados.push(sensores[i]);
		}
		// Añadir refrescado de gráfico
	}
});
