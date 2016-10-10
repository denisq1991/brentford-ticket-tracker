var fs = require('fs');
var request = require('request');
var spawn = require('child_process').spawn;

var contents = fs.readFileSync("config.json");
var config = JSON.parse(contents);

var urlString = config.urlString;
var keyword = config.keyword;
var cookieValue = config.cookieValue;
var shellPath = config.shellPath

// Makes a request to orders page and calls the callback with html body to be processed
function makeRequest() {
	// make a first request to activate the session cookie
	request({
		headers: {
			'Cookie': cookieValue
		},
		uri: urlString,
		body: '',
		method: 'GET'
	}, function(err, res, body) {
		if (!err) {
			// make a second request to check for tickets
			request({
				headers: {
					'Cookie': cookieValue
				},
				uri: urlString,
				body: '',
				method: 'GET'
			}, function(err, res, body) {
				if (!err) {
					// save the response to a file to manually inspect it
					fs.writeFile('htmlResponse', body, function(err) {});
					if (body.includes(keyword)) {
						console.log(keyword + " tickets are up!")
							// set this to the full path of your email script if you want to run this on a cron
						spawn('sh', [shellPath]);
						console.log('email sent!')
					} else {
						console.log("No " + keyword + " tickets yet!")
					}
				} else {
					console.log('An error has occured');
				}

			});
		} else {
			console.log("No tickets yet!")
		}
	});
}
makeRequest();