var express = require('express');
var port = process.env.PORT ||6835 ;

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


/*******************
CUSTOMER ENTITY
	-Display
	-Insert
	-Update
*********************/

app.get ('/customer', function (req,res){
	data={};
	connection.query('SELECT * FROM Customers', function(err, rows, fields){
		data.customers=rows;
		if(err){
			console.log(err);
			console.log("Something went wrong trying to retrieve Customers from db.");
		} });

		res.render ('customer', {customer:data.customer});
	});

app.get ('/customer-insert', function (req, res) {
	connection.query ('INSERT INTO Customers (`Customer_name`, `Customer_phone`, `Customer_street`, `Customer_city`, `Customer_zip`) VALUES (?,?,?,?,?)',
	[req.query.cname, req.query.cphone, req.query.cstreet, req.query.ccity, req.query.czip],
	function (err, results) {
		if (err) {
			console.log(err);
			console.log("Something went wrong trying to insert a Customer.");
			return;
		}
		connection.query('SELECT * FROM Customers', function(err, rows, fields){
			data.customers = rows;
			if(err){
				console.log(err);
				console.log("Something has gone wrong trying to retrieve Customer rows from db.");
				return;
			}
			res.render('customer', {customer: data.customers});
		});
	});
});




/*******************
PPRODUCT ENTITY
	-Display
	-Insert
	-Update
*********************/

app.get('/product', function (req,res){
	data={};
	connection.query('SELECT * FROM Products', function(err, rows, fields){
		data.products=rows;
		if(err){
			console.log(err);
			console.log("Something went wrong trying to retrieve Products from db.");
		}
	connection.query('SELECT Manufacturer_name FROM Manufacturers')
		res.render ('product', {product:data.products});
	});
});


 app.get ('/products-insert', function (req, res) {
	connection.query ('INSERT INTO Products (`Product_name`, `Product_description`, `Product_cost`, `Product_price` ) VALUES (?,?,?,?)',
	[req.query.pname, req.query.pdescription, req.query.pcost, req.query.pprice],
	function (err, results) {
		if (err) {
			console.log(err);
			console.log("Something went wrong trying to insert a Product.");
			return;
		}
		connection.query('SELECT * FROM Products', function(err, rows, fields){
			data.products = rows;
			if(err){
				console.log(err);
				console.log("Something has gone wrong trying to retrieve Products rows from db.");
				return;
			}
			res.render('product', {product: data.products});
		});
	});
});

/*******************
COMPONENT ENTITY
	-Display
	-Insert
	-Update
*********************/

app.get ('/component', function (req, res){
	data={};
	dd_data ={};
	connection.query('SELECT * FROM Components', function(err, rows, fields){
		data.components=rows;
		if(err){
			console.log(err);
			console.log("Something went wrong trying to retrieve Components from db.");
		}
	//console.log(data.components)
	connection.query('SELECT * FROM Manufacturers', function(err, rows, fields) {
	dd_data.dropdown=rows;
	 if (err) {
		console.log(err);
		console.log( "somehting went wrong");
	
	}
 	 //console.log(dd_data.dropdown);
   
	
	console.log (dd_data.dropdown);
	console.log (data.components);
		res.render ('component', {component:data.components, dropdown:dd_data.dropdown});
		
	});
});
});

app.get ('/component-insert', function (req, res) {
	connection.query ('INSERT INTO Components (`Component_partNumber`, `Component_type`, `Component_stock`, `Component_Manufacturer_id`, `Component_cost`, `Component_leadTime` ) VALUES (?,?,?,?,?, ?)',
	[req.query.cpartNumber, req.query.ctype, req.query.cstock, req.query.mid, req.query.ccost, req.query.cleadTime],
	function (err, results) {
		if (err) {
			console.log(err);
			console.log("Something went wrong trying to insert a Component.");
			return;
		}
		connection.query('SELECT * FROM Components', function(err, rows, fields){
			data.components = rows;
			if(err){
				console.log(err);
				console.log("Something has gone wrong trying to retrieve Components rows from db.");
				return;
			}
			res.render('component', {component: data.components});
		});
	});
});


app.get('/component-delete', function(req, res){
	connection.query('DELETE FROM Components WHERE Component_id=?', [req.query.id], function(err, result){
		if(err){
			console.log(err);
			console.log("Something went wrong trying to delete entry from Components.");
		}
	});
});

/***************************
COMPONENT-PRODUCT ENTITY
	-Display
	-Insert
	-Update
****************************/

app.get ('/component_product', function (req, res) {
	data = {};
	connection.query('SELECT * FROM Components_Products cp INNER JOIN Products p ON cp.pid = p.Product_id INNER JOIN Components c ON cp.cid = c.Component_id',
		function(err, rows, fields){
			data.components_products = rows;
			if(err){
				console.log(err);
				console.log("Something went wrong pulling the Component/Product Association.");
			}
			res.render('component_product', {cp:data.components_products});
		});
});

/*******************
ORDER ENTITY
	-Display
	-Insert
	-Update
	-Delete
*********************/

app.get ('/order', function (req, res) {
	data = {};
	connection.query('SELECT * FROM Orders', function(err, rows, fields){
			data.orders = rows;
			if(err){
				console.log(err);
				console.log("Something went wrong pulling the Orders");
			}
			console.log(rows);
			res.render('order', {order:data.orders});
		});
});



app.get('/order-delete', function(req, res){
	connection.query('DELETE FROM Orders_Products WHERE oid=? AND pid=?', [req.query.oid, req.query.pid], function(err, result){
		if(err){
			console.log(err);
			console.log("Something went wrong trying to delete entry from Components.");
		}
	});
});

 app.get ('/orders-insert', function (req, res) {
	connection.query ('INSERT INTO Orders (`Order_status`, `Order_dateCreated`, `Order_dateFulfilled`, `Order_Customer_id` ) VALUES (?,?,?,?)',
	[req.query.ostatus, req.query.datec, req.query.datef, req.query.customer],
	function (err, results) {
		if (err) {
			console.log(err);
			console.log("Something went wrong trying to insert an Order.");
			return;
		}
		connection.query('SELECT * FROM Orders', function(err, rows, fields){
			data.orders = rows;
			if(err){
				console.log(err);
				console.log("Something has gone wrong trying to retrieve Products rows from db.");
				return;
			}
			res.render('order', {order: data.orders});
		});
	});
});


/*******************
ORDER/PRODUCT ENTITY
	-Display
	-Insert
	-Update
*********************

app.get ('/order', function (req, res) {
	data = {};
	connection.query('SELECT * FROM Orders_Products op INNER JOIN Orders o ON op.oid = o.Order_id INNER JOIN Customers c ON o.Order_Customer_id = c.Customer_id INNER JOIN Products p ON op.pid = p.Product_id',
		function(err, rows, fields){
			data.orders_products = rows;
			if(err){
				console.log(err);
				console.log("Something went wrong pulling the Orders/Product Association");
			}
			console.log(rows);
			res.render('order', {order:data.orders_products});
		});
}); */


/*******************
MANUFACTURER ENTITY
	-Display
	-Insert
	-Update
*********************/

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

/*app.get('/manufacturer-delete', function(req, res, next){
	connection.query('DELETE FROM Manufacturers WHERE Manufacturer_id=?', [req.query.id], function(err, result){
		if(err){
			console.log(err);
			console.log("Something went wrong trying to delete a Manufacturer.");
			return;
		}
	});
});*/

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

app.get('/manufacturer-search', function(req, res){
	data = {};
	connection.query('SELECT * FROM Manufacturers WHERE Manufacturer_name LIKE ?',
	'%' + req.query.name + '%', 
	function(err, rows, fields){
		data.manufacturers = rows;
		if(err){
			console.log(err);
			console.log("Something has gone wrong trying to retrieve Manufacturers rows from db.");
			return;
		}
		res.render('manufacturer', {manufacturer: data.manufacturers});
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
