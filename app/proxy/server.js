var express = require('express');
var request = require('request');
var app = express();
var API_KEY = 'RGAPI-c56ece47-4847-4675-a66d-d4b7c04f1b46';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
	// console.log(req.originalUrl);
	console.log('param:', req.query.url);

	request('https://' + req.query.url + '?api_key=' + API_KEY, function (error, response, body) {
		console.log('error:', error);
		console.log('statusCode:', response && response.statusCode);
		console.log('body:', body); 
		
		// 404 Not found
		if (response.statusCode == 404) {
			res.sendStatus(404);
		}
		// 200 Okay
		else res.send(body);
		res.end();
	});
});

app.listen(5000, function() {
	console.log('Node.js web server listening on port 5000');
});

