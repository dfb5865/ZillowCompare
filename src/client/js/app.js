var ZillowCompareApp = angular.module('ZillowCompareApp', ['ngRoute', 'ZillowCompareControllers' ]);

ZillowCompareApp.config( function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true);
    $routeProvider.
      when('/', {
        templateUrl: '/partials/search.html',
        controller: 'SearchCtrl'
      }).
      when('/comparehomes/:leftAddress/:rightAddress', {
        templateUrl: '/partials/homecompare.html',
        controller: 'CompareCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  });