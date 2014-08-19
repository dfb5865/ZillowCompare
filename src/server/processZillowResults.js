var request = require('request');
var parseString = require('xml2js').parseString;

//Expose this function to consumers of the module
exports.getResult = function(streetAddress, cityStateZip, callback){
  
  //Create Zillow rest API url for the given address
  var searchResultsUrlBase = 'http://zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1b4ka4wuhor_61q4u';
  var searchResultsUrl = searchResultsUrlBase + '&address=' + streetAddress + '&citystatezip=' + cityStateZip;
  
  //Use request to get the XML results of the zillow API call
  request(searchResultsUrl, function (searchResultsError, searchResultsResponse, searchResultsBody){
    //Check if we got a good http response
		if (!searchResultsError && searchResultsResponse.statusCode == 200){
      //Parse the xml from zillow into json
      parseString(searchResultsBody, function (err, jsonSearchResults){
        //grab the data we are looking for
        getSimpleSearchResult(jsonSearchResults, function(result){
          //If we actually found a match from zillow, make the 'GetUpdatedPropertyDetails' zillow API call to get images and price
          if(result.code === 0){
            //Add the images and price and call back to send the result
            addPriceAndImages(result, function(detailedResult){
              callback(detailedResult);
            });
          }
          //Couldn't find an address, call back with a failed result
          else{
            callback(result);
          }
        });
      });
    }
    //If we got a bad http response, send a failed result
    else{
      createFailedResult(function(failedResult){
        callback(failedResult);
      });
    }
	});
  
}

function getSimpleSearchResult( searchResult, callback ){
  var result = {};
  var zillowResponseCode = searchResult['SearchResults:searchresults'].message[0].code[0];
        
  if(zillowResponseCode == 0){
  
    var zillowResults = searchResult['SearchResults:searchresults'].response[0].results[0].result[0];    
    
    result.code = 0;
    result.zpid = zillowResults.zpid[0];         
    result.address = {};
    result.address.street = zillowResults.address[0].street[0];
    result.address.city = zillowResults.address[0].city[0];
    result.address.state = zillowResults.address[0].state[0];
    result.address.zip = zillowResults.address[0].zipcode[0];
    if(zillowResults.hasOwnProperty('yearBuilt')){
      result.year = zillowResults.yearBuilt[0];
    }
    else{
      result.year = 'No Data';
    }
    if(zillowResults.hasOwnProperty('finishedSqFt')){
      result.sqft = zillowResults.finishedSqFt[0];
    }
    else{
      result.sqft = 'No Data';
    }
    if(zillowResults.hasOwnProperty('bathrooms')){
      result.bathrooms = zillowResults.bathrooms[0];
    }
    else{
      result.bathrooms = 'No Data';
    }
    if(zillowResults.hasOwnProperty('bedrooms')){
      result.bedrooms = zillowResults.bedrooms[0];
    }
    else{
      result.bedrooms = 'No Data';
    }    
    if(zillowResults.hasOwnProperty('lastSoldPrice')){
      result.lastSoldPrice = zillowResults.lastSoldPrice[0]['_'];
    }
    else{
      result.lastSoldPrice = 'No Data';
    }
    
    if(zillowResults.hasOwnProperty('lastSoldDate')){
      result.lastSoldDate = zillowResults.lastSoldDate[0];
    }
    else{
      result.lastSoldDate = 'No Data';
    }
    
    callback(result);
  }
  else{
    createFailedResult(function(failedResult){
      callback(failedResult);
    });
  }
}

function addPriceAndImages(result, callback){
  var updatedResult = result;
  var updatedDetailsUrl = 'http://zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=X1-ZWz1b4ka4wuhor_61q4u&zpid=' + result.zpid;
    
  request(updatedDetailsUrl, function (updatedDetailsError, updatedDetailsResponse, updatedBody){
    if (!updatedDetailsError && updatedDetailsResponse.statusCode == 200){
      parseString(updatedBody, function (updatedErr, updatedDetailsResult){
      
        var updatedZillowResponseCode = updatedDetailsResult['UpdatedPropertyDetails:updatedPropertyDetails'].message[0].code[0];

        if(updatedZillowResponseCode == 0){
          
          var zillowUpdatedResult = updatedDetailsResult['UpdatedPropertyDetails:updatedPropertyDetails'].response[0];
          
          if(zillowUpdatedResult.hasOwnProperty('posting')){
            updatedResult.price = zillowUpdatedResult.posting[0].price[0]['_'];
          }
          else{
            updatedResult.price = 'No Data';
          }
          
          if(zillowUpdatedResult.hasOwnProperty('images')){
            updatedResult.images = zillowUpdatedResult.images[0].image[0].url;
          }
          else{
            updatedResult.images = ['/img/noimage.png'];
          }
          
          callback(updatedResult);
        }
        else{
          updatedResult.price = 'No Data';
          updatedResult.images = ['/img/noimage.png'];
          callback(updatedResult);
        }
      });
    }
    else{
      updatedResult.images = ['/img/noimage.png'];
      updatedResult.price = 'No Data';
      callback(updatedResult);
    }    
  });
}

function createFailedResult(callback){
  var failedResult = {};
  
  failedResult.code = 1;
  failedResult.zpid = 'No Data';         
  failedResult.address = {};
  failedResult.address.street = 'No Data';
  failedResult.address.city = 'No Data';
  failedResult.address.state = 'No Data';
  failedResult.address.zip = 'No Data';
  failedResult.year = 'No Data';
  failedResult.sqft = 'No Data';
  failedResult.bathrooms = 'No Data';
  failedResult.bedrooms = 'No Data';
  failedResult.lastSoldPrice = 'No Data';
  failedResult.lastSoldDate = 'No Data';
  failedResult.price = 'No Data';
  failedResult.images = ['/img/noimage.png']; 
  
  callback(failedResult);
}