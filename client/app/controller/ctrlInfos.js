// Avec le service
angular.module('myApp').controller('ctrlInfos', ['$scope', '$stateParams', 'photonFactory', function($scope, $stateParams, photonFactory) {
		console.log($stateParams.id);
		$scope.photon = photonFactory.get({id : $stateParams.id});
		$scope.photon_id = $stateParams.id;
}]);
