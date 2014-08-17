var express = require('express');
var request = require('request');
var parseString = require('xml2js').parseString;
var app = express();


app.get('/home/:address/:citystatezip', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  
	var url = 'http://zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1b4ka4wuhor_61q4u';
	var streetAddress = req.params.address;
	var cityStateZip = req.params.citystatezip;
	
	console.log('GET -> ' + streetAddress + ' ' + cityStateZip);
	
	url += '&address=' + streetAddress;
	url += '&citystatezip=' + cityStateZip;
	
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
      parseString(body, function (err, result) {
        
        zillowResponseCode = result['SearchResults:searchresults'].message[0].code[0];
        
        if(zillowResponseCode == 0){
        
          zillowResult = result['SearchResults:searchresults'].response[0].results[0].result[0];
          
          var ourResult = {};
          ourResult.code = 0;
          ourResult.zpid = zillowResult.zpid[0]         
          ourResult.address = {};
          ourResult.address.street = zillowResult.address[0].street[0];
          ourResult.address.city = zillowResult.address[0].city[0];
          ourResult.address.state = zillowResult.address[0].state[0];
          ourResult.address.zip = zillowResult.address[0].zipcode[0];
          ourResult.year = zillowResult.yearBuilt[0];
          ourResult.sqft = zillowResult.finishedSqFt[0];
          ourResult.bathrooms = zillowResult.bathrooms[0];
          ourResult.bedrooms = zillowResult.bedrooms[0];          
          
          var updatedUrl = 'http://zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=X1-ZWz1b4ka4wuhor_61q4u&zpid=' + zillowResult.zpid[0];
          
          request(updatedUrl, function (updatedError, updatedResponse, updatedBody) {
            if (!updatedError && updatedResponse.statusCode == 200) {
              parseString(updatedBody, function (updatedErr, updatedResult) {
                
                updatedZillowResponseCode = updatedResult['UpdatedPropertyDetails:updatedPropertyDetails'].message[0].code[0];
                
                if(updatedZillowResponseCode == 0){
                  zillowUpdatedResult = updatedResult['UpdatedPropertyDetails:updatedPropertyDetails'].response[0];
                  ourResult.images = zillowUpdatedResult.images[0].image[0].url;
                  res.send(ourResult);
                }
                else{
                  ourResult.code = 501;
                  res.send(ourResult);
                }
              });
            }
          });

        }else{
          var ourResult = {};
          ourResult.code = 1;
          
          console.log(ourResult);
          
          res.send(ourResult);        
        }
      });			
		}
	});	
});

var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
});
