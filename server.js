var fs = require('fs');
var request = require('request');
var spawn = require('child_process').spawn;

var urlString = 'https://tickets.brentfordfc.co.uk/PagesPublic/ProductBrowse/productHome.aspx';
var keyword = 'Barnsley';
var cookieValue = '.ASPXANONYMOUS=6Ey_DpZV0gEkAAAAYzM4NzMxMDktMWY3ZS00MzU0LTkyNzYtY2FkYTA1ZDc4MjQ4pwgvMd0yVM5lqrpuZqpuvnQofOg1; ASP.NET_SessionId=zehciq3kekud3wubuao5ft1s';

// Makes a request to orders page and calls the callback with html body to be processed

function makeRequest() {
	request({
		headers: {
			'Cookie': cookieValue
		},
		uri: urlString,
		body: '',
		method: 'GET'
	}, function(err, res, body) {
		if (!err) {
			fs.writeFile('htmlResponse', body, function(err) {});

			if (body.includes(keyword)) {
				console.log(keyword + " tickets are up!")
				spawn('sh', ['emailNotifier.sh']);
				console.log('email sent!')
			} else {
				console.log("No tickets yet!")
			}
		} else {
			console.log('An error has occured');
		}

	});
}
makeRequest();