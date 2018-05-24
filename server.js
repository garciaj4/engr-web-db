var express = require('express');
var port = process.env.PORT || 8080 ;

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

app.get ('/customer', function (req,res){
	res.render ('customer');
});

app.get('/product', function (req,res){
	res.render ('product');
});

app.get('/manufacturer', function(req, res){
	data = {};
	connection.query('SELECT * FROM Manufacturers', function(err, rows, fields){
		data.manufacturers = rows;
		if(err){
			console.log(err);
			console.log("Something has gone wrong trying to retrieve Manufacturers rows from db.");
			return;
		}
		res.render('manufacturer', {manufacturer: data.manufacturers});
	});

});

app.get ('/manufacturer-insert', function (req, res) {
	connection.query ('INSERT INTO Manufacturers (`Manufacturer_name`, `Manufacturer_phone`, `Manufacturer_zip`, `Manufacturer_discount`, `Manufacturer_preferred`) VALUES (?,?,?,?,?)',
	[req.query.name, req.query.phone, req.query.zip, req.query.discount, req.query.preferred],
	function (err, results) {
		if (err) {
			console.log(err);
			console.log("Something went wrong trying to insert a Manufacturer.");
			return;
		}
		connection.query('SELECT * FROM Manufacturers', function(err, rows, fields){
			data.manufacturers = rows;
			if(err){
				console.log(err);
				console.log("Something has gone wrong trying to retrieve Manufacturers rows from db.");
				return;
			}
			res.render('manufacturer', {manufacturer: data.manufacturers});
		});
	});
});

app.get('/manufacturer-delete', function(req, res, next){
	connection.query('DELETE FROM Manufacturers WHERE Manufacturer_id=?', [req.query.id], function(err, result){
		if(err){
			console.log(err);
			console.log("Something went wrong trying to delete a Manufacturer.");
			return;
		}
	});
});

app.get('/manufacturer-update', function(req, res, next){
	connection.query('UPDATE Manufacturers Set Manufacturer_name=?, Manufacturer_discount=?, Manufacturer_preferred=?, Manufacturer_phone=?, Manufacturer_zip=? WHERE Manufacturer_id=?',
		[req.query.name, req.query.discount, req.query.preferred, req.query.phone, req.query.zip, req.query.id],
		function(err, result){
			if(err){
				console.log(err);
				console.log("Something went wrong trying to update a Manufacturer.");
				return;
			}
		});
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
	console.log("App Running on port: " + port + ".  Ctrl+C to terminate.");
});
