angular.module('myApp').config(function($stateProvider, $urlRouterProvider) {
  var helloState = {
    name: 'hello',
    url: '/hello',
    templateUrl: 'app/templates/hello.html'
  }

  var aboutState = {
    name: 'about',
    url: '/about',
    templateUrl: 'app/templates/about.html'
  }

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);

  $urlRouterProvider.otherwise('/');
  // $locationProvider.html5Mode(true);
});