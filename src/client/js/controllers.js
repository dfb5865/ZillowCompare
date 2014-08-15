var ZillowCompareControllers = angular.module('ZillowCompareControllers', []);
  
ZillowCompareControllers.controller('HomeSearchCtrl', function ($scope, $http) {
  $http.get('/sample_data/homes.json').success(function(data) {
    $scope.homes = data;
  });
});