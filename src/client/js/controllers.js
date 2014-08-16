var ZillowCompareControllers = angular.module('ZillowCompareControllers', []);
  
ZillowCompareControllers.controller('CompareCtrl', function ($scope, $http, $routeParams) {
  var leftHomeAddress = $routeParams.leftAddress;
  var leftHomeUrl = 'http://54.183.167.79:8080/home/' + leftHomeAddress + '/' + '92620';
  var rightHomeAddress = $routeParams.rightAddress;
  var rightHomeUrl = 'http://54.183.167.79:8080/home/' + rightHomeAddress + '/' + '92620'; 
  $http.get(leftHomeUrl).success(function(data) {
    $scope.leftHome = data;
  });
  $http.get(rightHomeUrl).success(function(data) {
    $scope.rightHome = data;
  });
});
  
ZillowCompareControllers.controller('SearchCtrl', function ($scope, $location) {
  $scope.getSearchResults = function(){
    $( "#leftError" ).remove();
    $( "#rightError" ).remove();
	  var leftAddress = $( "#leftSearchText" ).val();
    var rightAddress = $( "#rightSearchText" ).val();
	  if(leftAddress === ""){
      $( "#leftSearch" ).append( '<div id="leftError"><br/><div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> Please enter a valid address </div></div>');
	  }
    else if(rightAddress === ""){
      $( "#rightSearch" ).append( '<div id="rightError"><br/><div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> Please enter a valid address </div></div>');
	  }else{
      $location.path("/comparehomes/" + leftAddress + '/' + rightAddress);
	  }  
  };
});