var ZillowCompareApp = angular.module('ZillowCompareApp', ['ngRoute', 'ZillowCompareControllers' ]);

ZillowCompareApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/search.html'
      }).
      when('/homes', {
        templateUrl: 'partials/homelist.html',
        controller: 'HomeSearchCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);