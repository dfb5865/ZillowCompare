var ZillowCompareControllers = angular.module('ZillowCompareControllers', []);
  
ZillowCompareControllers.controller('ResultsCtrl', function ($scope, $http) {
  $http.get('/sample_data/homes.json').success(function(data) {
    $scope.homes = data;
  });
});
  
ZillowCompareControllers.controller('SearchCtrl', function ($scope, $location) {
  $scope.getSearchResults = function(){
	$( "#error" ).remove();
	  var address = $( "#searchText" ).val();
	  if(address === ""){
		$( "#searchGroup" ).append( '<div id="error"><br/><div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> Please enter an address </div></div>');
	  } else{
		$location.path("/homes/" + address);
	  }  
  };
});