var express = require('express');
var zillowProcessor = require('./processZillowResults');
var app = express();

app.get('/home/:address/:citystatezip', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var streetAddress = req.params.address;
    var cityStateZip = req.params.citystatezip;

    zillowProcessor.getResult(streetAddress, cityStateZip, function (result) {
        console.log(result);
        res.send(result);
    });
});

var server = app.listen(8080, function () {
    console.log('Listening on port %d', server.address().port);
});