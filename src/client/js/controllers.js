var ZillowCompareControllers = angular.module('ZillowCompareControllers', []);
  
ZillowCompareControllers.controller('CompareCtrl', function ($scope, $http, $routeParams, $location) {
  var leftHomeAddress = $routeParams.leftStreet;
  var leftCityState = $routeParams.leftCityState;
  var leftHomeUrl = 'http://54.183.167.79:8080/home/' + leftHomeAddress + '/' + leftCityState;
  var rightHomeAddress = $routeParams.rightStreet;
  var rightCityState = $routeParams.rightCityState;
  var rightHomeUrl = 'http://54.183.167.79:8080/home/' + rightHomeAddress + '/' + rightCityState;
  $http.get(leftHomeUrl).success(function(data) {
    $scope.leftHome = data;
  });
  $http.get(rightHomeUrl).success(function(data) {
    $scope.rightHome = data;
  });
  
  $scope.getSearchResults = function(){
  
	  var leftStreet = $( "#leftStreet" ).val();
    var leftCity = $( "#leftCity" ).val();
    var leftState = $( "#leftState" ).val();
    
    var rightStreet = $( "#rightStreet" ).val();
    var rightCity = $( "#rightCity" ).val();
    var rightState = $( "#rightState" ).val();
    
    $location.path("/comparehomes/" + leftStreet + '/' + leftCity + '+' + leftState + '/' + rightStreet + '/' + rightCity + '+' + rightState);
  };
  
});
  
ZillowCompareControllers.controller('SearchCtrl', function ($scope, $location) {
  $scope.getSearchResults = function(){
  
	  var leftStreet = $( "#leftStreet" ).val();
    var leftCity = $( "#leftCity" ).val();
    var leftState = $( "#leftState" ).val();
    
    var rightStreet = $( "#rightStreet" ).val();
    var rightCity = $( "#rightCity" ).val();
    var rightState = $( "#rightState" ).val();
    
    $location.path("/comparehomes/" + leftStreet + '/' + leftCity + '+' + leftState + '/' + rightStreet + '/' + rightCity + '+' + rightState);
  };
});