var ZillowCompareApp = angular.module('ZillowCompareApp', ['ngRoute', 'ZillowCompareControllers' ]);

ZillowCompareApp.config( function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/search.html',
        controller: 'SearchCtrl'
      }).
      when('/comparehomes/:leftStreet/:leftCityState/:rightStreet/:rightCityState', {
        templateUrl: '/partials/homecompare.html',
        controller: 'CompareCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  });