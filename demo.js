//Get Modules

var express = require('express');
var routes = require('./routes');

var multer = require('multer');

var app = express();
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var ObjectID = require('mongodb').ObjectID;

app.set('port', process.env.PORT || 3000);
//app.set('port', process.env.PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/public/favicon.png'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));

// app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static(path.join(__dirname ,'public')));
//app.use(express.static(path.join(__dirname, 'another')));

app.post('/signup', function(req, res){
	
	var user_given_firstname = req.body.first_name;
	var user_given_lastname = req.body.last_name;
	var user_given_roll = req.body.roll_no;
	var user_given_dept = req.body.department;
	var user_given_ph = req.body.ph_no;
	
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://localhost:27017/';

	MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },function(err, db) {
		if (err) throw err;
		
		var dbo = db.db("student");

		var obj = {firstname : user_given_firstname, lastname : user_given_lastname,roll : user_given_roll,dept : user_given_dept,phone : user_given_ph };
		dbo.collection("details").insertOne(obj,function(err, result) {
			if (err) throw err;

			console.log("Data Inserted");
			//console.log(db);
		});
	});
});


app.post('/updatee', function(req, res){

	var user_given_data = req.body.id;
	var user_given_firstname = req.body.first_name;
	var user_given_lastname = req.body.last_name;
	var user_given_roll = req.body.roll_no;
	var user_given_dept = req.body.department;
	var user_given_ph = req.body.ph_no;
	console.log(user_given_data);
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://localhost:27017/';

	MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },function(err, db) {
		if (err) throw err;
		
		var dbo = db.db("student");
		var query={_id:ObjectID(user_given_data)};

		var newValues = {$set:{firstname : user_given_firstname, lastname : user_given_lastname,roll : user_given_roll,dept : user_given_dept,phone : user_given_ph }};
		dbo.collection("details").updateOne(query,newValues,function(err, result) {
			if (err) throw err;

			console.log("Data Inserted");
			//console.log(db);
		});
	});
});

app.post('/viewer', function(req, res){
	
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://localhost:27017/';

	MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },function(err, db) {
		if (err) throw err;
		
		var dbo = db.db("student");

		dbo.collection("details").find({}).toArray(function(err, result) {
			if (err) throw err;

			//console.log(result);
			res.send(result);
			//console.log(db);
		});
	});
});

app.post('/fetch_data_update', function(req, res){

	var user_given_data = req.body.id;
	
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://localhost:27017/';

	MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },function(err, db) {
		if (err) throw err;
		
		var dbo = db.db("student");

		dbo.collection("details").find({_id:ObjectID(user_given_data)}).toArray(function(err, result) {
			if (err) throw err;

			//console.log(result);
			res.send(result);
			//console.log(db);
		});
	});
});

app.post('/removing', function(req, res){

	var user_given_data = req.body.deep;
	
	console.log(user_given_data);

	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://localhost:27017/';

	MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },function(err, db) {
		if (err) throw err;
		
		var dbo = db.db("student");

		// var myquery = { _id : user_given_data};

		dbo.collection("details").deleteOne({_id : ObjectID(user_given_data) }, function(err, obj) {
			if (err) throw err;

			//console.log(result);
			res.send(obj);
			//console.log(db);
		});
	});
});



//GET download a document from the folder
app.get('/download_document',function(req,res)
{
	//console.log(req.query);
});

var server = http.createServer(app);

server.listen(app.get('port'), '0.0.0.0', function(){
	console.log('Express server listening on port ' + app.get('port'));
});