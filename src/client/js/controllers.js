var ZillowCompareControllers = angular.module('ZillowCompareControllers', []);
  
ZillowCompareControllers.controller('CompareCtrl', ['$scope', '$http', '$routeParams', 'searchSubmitService', function ($scope, $http, $routeParams, searchSubmitService) {

  var leftHomeAddress = $routeParams.leftStreet;
  var leftCity = $routeParams.leftCity;
  var leftState = $routeParams.leftState;
  var leftHomeUrl = 'http://54.183.167.79:8080/home/' + leftHomeAddress + '/' + leftCity + '+' + leftState;
  var rightHomeAddress = $routeParams.rightStreet;
  var rightCity = $routeParams.rightCity;
  var rightState = $routeParams.rightState;
  var rightHomeUrl = 'http://54.183.167.79:8080/home/' + rightHomeAddress + '/' + rightCity + '+' + rightState;
  
  function processFailedResponse(data, homeSide){
      if(homeSide == 'left'){
        data.address.street = leftHomeAddress;
        data.address.city = leftCity;
        data.address.state = leftState;
        data.address.zip = '';
      }
      else if(homeSide == 'right'){
        data.address.street = rightHomeAddress;
        data.address.city = rightCity;
        data.address.state = rightState;
        data.address.zip = '';
      }
       
  }
  
  $http.get(leftHomeUrl).success(function(data) {
    if(data.code != 0){
      processFailedResponse(data, 'left');
    }
    $scope.leftHome = data;
  })
  .error(function() {
    $( '#mainContainer' ).html( '<h1 class="text-center">Error getting home data from server<h1>' );
  });
  
  $http.get(rightHomeUrl).success(function(data) {
    if(data.code != 0){
      processFailedResponse(data, 'right');
    }
    $scope.rightHome = data;
  })
  .error(function() {
    $( '#mainContainer' ).html( '<h1 class="text-center">Error getting home data from server<h1>' );
  });;
  
  $scope.getSearchResults = function(){
    searchSubmitService.submit();
  };
  
}]);
  
ZillowCompareControllers.controller('SearchCtrl', ['$scope', 'searchSubmitService', function ($scope, searchSubmitService) {
  $scope.getSearchResults = function(){
    searchSubmitService.submit();
  };
}]);