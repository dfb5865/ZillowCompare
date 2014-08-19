//All controllers will be in one module for this app, since it's small
var ZillowCompareControllers = angular.module('ZillowCompareControllers', []);

//Used on the comparehomes.html page
//Grabs the params from the url, and calls the servers rest api
//Binds the data to leftHome and rightHome respectively
//Also contains a function that sets the displayed address back to what the user entered in the case of no data
ZillowCompareControllers.controller('CompareCtrl', ['$scope', '$http', '$routeParams', 'searchSubmitService', function ($scope, $http, $routeParams, searchSubmitService) {

    var leftHomeAddress = $routeParams.leftStreet;
    var leftCity = $routeParams.leftCity;
    var leftState = $routeParams.leftState;
    var leftHomeUrl = 'http://54.183.167.79:8080/home/' + leftHomeAddress + '/' + leftCity + '+' + leftState;

    var rightHomeAddress = $routeParams.rightStreet;
    var rightCity = $routeParams.rightCity;
    var rightState = $routeParams.rightState;
    var rightHomeUrl = 'http://54.183.167.79:8080/home/' + rightHomeAddress + '/' + rightCity + '+' + rightState;

    $http.get(leftHomeUrl).success(function (data) {
        if (data.code != 0) {
            processFailedResponse(data, 'left');
        }
        $scope.leftHome = data;
    })
    .error(function () {
        //TODO: manipulating html in the controller isn't great, this should be changed
        $('#mainContainer').html('<h1 class="text-center">Error getting home data from server<h1>');
    });

    $http.get(rightHomeUrl).success(function (data) {
        if (data.code != 0) {
            processFailedResponse(data, 'right');
        }
        $scope.rightHome = data;
    })
    .error(function () {
        //TODO: manipulating html in the controller isn't great, this should be changed
        $('#mainContainer').html('<h1 class="text-center">Error getting home data from server<h1>');
    });

    //This gets called when a user submits another search
    $scope.getSearchResults = function () {
        searchSubmitService.submit();
    };

    //If we didn't get data from the server, reset the address
    //This is useful because these bindings are used in the input boxes at the bottom of the page
    function processFailedResponse(data, homeSide) {
        if (homeSide == 'left') {
            data.address.street = leftHomeAddress;
            data.address.city = leftCity;
            data.address.state = leftState;
            data.address.zip = '';
        }
        else if (homeSide == 'right') {
            data.address.street = rightHomeAddress;
            data.address.city = rightCity;
            data.address.state = rightState;
            data.address.zip = '';
        }
    }

}]);

//This controller is used on the main search page to submit the search
ZillowCompareControllers.controller('SearchCtrl', ['$scope', 'searchSubmitService', function ($scope, searchSubmitService) {
    $scope.getSearchResults = function () {
        searchSubmitService.submit();
    };
}]);