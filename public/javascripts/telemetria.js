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
	$scope.removeSensors = function(sensores){
		console.log(sensores);
		for(var i = 0; i < sensores.length; i++){
			//if(sensores[i].nombre==$scope.graficados[i].nombre)
				
		}
		// Añadir refrescado de gráfico
	}

})
.directive("grafico", function () {
    return {
        restrict: "EA",
        template: "<div id='{{id}}'>" +
                  "</div>",
        scope: {
			inicio: "=inicio",
			fin: "=fin",
			obj:"=obj",
			id:"=id"
        },
        link: function (scope, element, attrs) {
        	scope.datos = [];
			scope.$watch('id', function(newval,oldval){
				console.log(newval);

				var grupo = scope.obj.id_trama;
				var sensor = scope.obj.offset;
				console.log("Graficando desde " + scope.inicio + " hasta " + scope.fin);
				//92.222.84.155:3443
				$.getJSON('http://92.222.84.155:3443/api/geth/' + scope.inicio + '/' + scope.fin + '/'+ grupo + '/' + sensor, function(data){
					// Filtramos por numero de trama
					var datos = [];
					for(var i = 0; i < data.length; i++){
						//if( data[i][1] == 4 ){
							datos.push([data[i][0], data[i][1]]);
						//}
					}
					scope.datos = datos;
				});
			});
			scope.$watch('datos', function(newval, oldval){
				$('#' + scope.obj.id_trama + '_' + scope.obj.offset).highcharts({

					chart: {
						zoomType: 'x'
					},
					title: {
					    text: 'Gráfico de telemetría'
					},

					subtitle: {
					    text: scope.obj.nombre
					},

					xAxis: {
					    tickInterval: 7 * 24 * 3600 * 1000, // one week
					    tickWidth: 0,
					    gridLineWidth: 1,
					    labels: {
					        align: 'left',
					        x: 3,
					        y: -3
					    }
					},

					yAxis: [{ // left y axis
					    title: {
					        text: null
					    },
					    labels: {
					        align: 'left',
					        x: 3,
					        y: 16,
					        format: '{value:.,0f}'
					    },
					    showFirstLabel: false
					}, { // right y axis
					    linkedTo: 0,
					    gridLineWidth: 0,
					    opposite: true,
					    title: {
					        text: null
					    },
					    labels: {
					        align: 'right',
					        x: -3,
					        y: 16,
					        format: '{value:.,0f}'
					    },
					    showFirstLabel: false
					}],

					legend: {
					    align: 'left',
					    verticalAlign: 'top',
					    y: 20,
					    floating: true,
					    borderWidth: 0
					},

					tooltip: {
					    shared: true,
					    crosshairs: true
					},

					plotOptions: {
					area: {
						fillColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
						stops: [
							[0, Highcharts.getOptions().colors[0]],
							[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
						]
					}
					},
					    series: {
					        cursor: 'pointer',
					        point: {
					            events: {
					            }
					        },
					        marker: {
					            lineWidth: 1
					        }
					    }
					},

					series: [{
					type: 'area',
					    name: scope.obj.nombre,
						data: scope.datos,
					    lineWidth: 4,
					    marker: {
					        radius: 4
					    }
					}]
				});
			});
    	}
    }
})
