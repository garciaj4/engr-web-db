var express = require('express');
var port = process.env.PORT || 8080;

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var mysql = require ('mysql')
var connection = mysql.createConnection({
	host		: 'classmysql.engr.oregonstate.edu',
	user		: 'cs340_garciaj4',
	password	: '5417',
	database	: 'cs340_garciaj4'
});

app.use(express.static(__dirname));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
	res.render('home');
});

app.get('/home', function(req, res){
	res.render('home');
});

app.get('/manufacturer', function(req, res){
	var context = {};
	connection.query('SELECT * FROM Manufacturers', function(err, rows, fields){
		if ((err)) {
			next(err);
			return;
		}
		context.results = JSON.stringify(rows);
	});
	res.render('manufacturer', context);
});

app.use(function(req, res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500');
});

app.listen(port, function(){
	console.log("App Running");
});