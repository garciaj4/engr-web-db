var express = require('express');
var port = process.env.PORT || 8080;

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(express.static(__dirname));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
	res.render('home');
});

app.get('/home', function(req, res){
	res.render('home');
});

app.get('/add-delete-update', function(req, res){
	res.render('add_delete_update_manufacturer');
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