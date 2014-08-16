var express = require('express');
var request = require('request');
var $ = require('jquery');
var app = express();


app.get('/home/:address/:citystatezip', function(req, res){

	var url = 'http://zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1b4ka4wuhor_61q4u';
	var streetAddress = req.params.address;
	var cityStateZip = req.params.citystatezip;
	
	console.log('GET -> ' + streetAddress + ' ' + cityStateZip);
	
	url += '&address=' + streetAddress;
	url += '&citystatezip=' + cityStateZip;
	
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.send(body);
		}
	});	
});

var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
});
