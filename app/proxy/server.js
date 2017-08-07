var express = require('express');
var request = require('request');
var app = express();
var API_KEY = 'RGAPI-386e5352-b75d-43e1-9575-e0945894635a';

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

		/* Check Riot Games status code here. */
		
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

