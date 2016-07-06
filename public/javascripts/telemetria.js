var telemetria = angular.module('telemetria',[]);

telemetria.controller('graficarCtrl', function($scope) {
  $scope.greeting = 'Hola!';
  setInterval(function(){
   $scope.$apply(function(){
	   $scope.greeting = $scope.greeting + " a";
   });
  }, 1000);
});
