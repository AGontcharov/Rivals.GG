var express = require('express');
var app = express();

// Loads the database module to cofigure and connect to the mysql database
var db = require('./server/database/database');

// Loads the api routes
var api = require('./server/endpoints')(db);
app.use('/api', api);

// Serves static contents from the /public folder
app.use('/', express.static(__dirname + '/public'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, function() {
  console.log("Listening on port 3000");
});