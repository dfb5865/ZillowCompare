var ZillowCompareApp = angular.module('ZillowCompareApp', ['ngRoute', 'ZillowCompareControllers' ]);

ZillowCompareApp.config( function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true);
    $routeProvider.
      when('/', {
        templateUrl: '/partials/search.html',
		controller: 'SearchCtrl'
      }).
      when('/homes/:address', {
        templateUrl: '/partials/homelist.html',
        controller: 'ResultsCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  });