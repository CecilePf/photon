angular.module('myApp').controller('ctrlEvents', ['$scope', '$stateParams', 'eventFactory', function($scope, $stateParams, eventFactory) {
	$scope.evenements = eventFactory.query({'id' : $stateParams.id}).$promise.then(data => $scope.evenements = data);
	$scope.photon_id = $stateParams.id;
}]);