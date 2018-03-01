angular.module('myApp').controller('myCtrl', function($scope) {
	$scope.sayHello = function() {
		console.log($scope.variable);
	}
});