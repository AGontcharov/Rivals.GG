var express = require('express');
var request = require('request');
var app = express();
var API_KEY = '?api_key=RGAPI-52bd06bc-04ae-40af-8f4b-c0faafc4e72d';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
	// console.log(req.originalUrl);
	console.log('param:', req.query.url);

	request('https://' + req.query.url + API_KEY, function (error, response, body) {
		console.log('error:', error); // Print the error if one occurred 
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
		console.log('body:', body); // Print the HTML for the API call. 

		res.send(body);
		res.end();
	});
});

app.listen(5000, function() {
	console.log('Node.js web server listening on port 5000');
});