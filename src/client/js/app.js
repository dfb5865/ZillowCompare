var ZillowCompareApp = angular.module('ZillowCompareApp', ['ngRoute', 'ZillowCompareControllers' ]);

ZillowCompareApp.config( function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/search.html',
        controller: 'SearchCtrl'
      }).
      when('/comparehomes/:leftStreet/:leftCity/:leftState/:rightStreet/:rightCity/:rightState', {
        templateUrl: '/partials/homecompare.html',
        controller: 'CompareCtrl'
      }).
      when('/about', {
        templateUrl: '/partials/about.html'
      }).
      otherwise({
        redirectTo: '/'
      });
});

ZillowCompareApp.factory('searchSubmitService', function($location) {

	return{
		submit: function() {
			var leftStreet = $( "#leftStreet" ).val();
			var leftCity = $( "#leftCity" ).val();
			var leftState = $( "#leftState" ).val();
			var rightStreet = $( "#rightStreet" ).val();
			var rightCity = $( "#rightCity" ).val();
			var rightState = $( "#rightState" ).val();

      $location.path("/comparehomes/" + leftStreet + '/' + leftCity + '/' + leftState + '/' + rightStreet + '/' + rightCity + '/' + rightState);

		}
	};
});