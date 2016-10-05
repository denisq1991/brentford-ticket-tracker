var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/', function(req, res) {

	callback = function(myBody) {
		if (myBody.length != 0) {

			console.log(myBody);

			//res.send(normalisedOrdersObject)
		} else {
			res.send('My body isnt generated yet')
		}
	}
	// Makes a request to orders page and calls the callback with html body to be processed
	request({
		headers: {
			'Cookie': ''
		},
		uri: 'https://tickets.brentfordfc.co.uk/PagesPublic/ProductBrowse/productHome.aspx?',
		body: '',
		method: 'GET'
	}, function(err, res, body) {
		if (!err) {
			console.log(body)
			callback(body)
		} else {
			res.send('An error has occured');
		}

	});

})

var port = '8000';
app.listen(port)

console.log('Magic happens on port ' + port);
exports = module.exports = app;