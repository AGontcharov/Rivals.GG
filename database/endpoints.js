module.exports = function(app, dirname, db) {

	app.get('/api/search/:region/:summoners', require('./resources/summoner.js'));

	app.get('*', function(req, res) {
		res.sendFile(dirname + '/public/index.html');
	});

	app.post('/api/register', function(req, res) {
		console.log(req.body);
	});

	app.post('/api/login', function(req, res) {
		console.log(req.body);
		db.query("SELECT * FROM users WHERE username='" + req.body.username + "'", function(err, result, fields) {
			if (err) throw err;
			res.send(result);
		});
	});
}