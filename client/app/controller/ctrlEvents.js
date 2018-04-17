angular.module('myApp').controller('ctrlEvents', ['$scope', '$stateParams', 'eventFactory', function($scope, $stateParams, eventFactory) {

	// Syntaxe Typescript
	// $scope.evenements = eventFactory.query({'id' : $stateParams.id}).$promise.then(data => $scope.evenements = data);

	$scope.evenements = eventFactory.query({'id' : $stateParams.id}).$promise.then(function(succ) {
		//console.log(succ);
		$scope.evenements = succ;
	}, function(err) {
		console.log(err);
	});

	$scope.photon_id = $stateParams.id;

	socket.on('event', function(msg) {
		$scope.evenements.push(msg);
		$scope.$apply();
	});
}]);