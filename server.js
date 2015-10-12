var express  = require('express');
var connect = require('connect');
var taxilist=require('functions/taxilist');
var order=require('functions/order');
var Login = require('functions/login');
var register = require('functions/register');
var getProfile = require('functions/getProfile');
var updateP=require('functions/updateProfile');
var checkUser= require('functions/checkUser');
var getOrder=require('functions/getOrders');
var app      = express();


//var connectionstring =process.env.OPENSHIFT_MONGODB_DB_URL||'mongodb://localhost/fleetsyncdb';
//mongoose.connect(connectionstring);
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(connect.logger('dev'));
app.use(connect.json());  
app.use(connect.urlencoded());


app.get('/', function(req, res) {

		res.end("Node-Android-Project"); 
	});
	
app.get('/taxiList',function(req,res){

		var pno = req.body.pno;
		taxilist.taxilst(function (found) {
			//console.log(found);
			res.json(found);
		});
	});
	
app.post('/login',function(req,res){
		var pno = req.body.pno;
		var password = req.body.password;

		Login.login(pno,password,function (found) {
			//console.log(found);
			res.json(found);
	});
	});
	
app.post('/order',function(req,res){

		var pno = req.body.pno;
		var DestinationLon = req.body.DestinationLat;
		var DestinationLat = req.body.DestinationLong;
		var LocationLat = req.body.LocationLat;
		var LocationLon = req.body.LocationLong;
		var OrderID=req.body.orderID;
		var TaxiID=req.body.taxiID;

		order.Order(pno,DestinationLon,DestinationLat,LocationLat,LocationLon,OrderID,TaxiID, function (found) {
			console.log(found);
			res.json(found);
		});
	});
	
app.post('/chkUser',function(req,res){
		var pno = req.body.pno;

		checkUser.check(pno,function (found) {
			console.log(found);
			res.json(found);
		});
	})

app.post('/register',function(req,res){

		var pno = req.body.pno;
		var password = req.body.password;
		var firstname = req.body.firstname;
		var lastname = req.body.lastname;
		var email = req.body.email;
		var gender = req.body.gender;
		var ownsVehicle = req.body.OwnsVehicle;
		var EnableRideShare = req.body.enableRS;

		register.register(pno,password,firstname,lastname,email,ownsVehicle,EnableRideShare,gender, function (found) {
			console.log(found);
			res.json(found);
	});		
	});
	
app.post('/getProfile',function(req,res){
		var pno = req.body.pno;

		getProfile.getPr(pno,function (found) {
			console.log(found);
			res.json(found);
		});
	});
	
app.post('/updateProfile',function(req,res){

		var pno = req.body.pno;
		var password = req.body.password;
		var firstname = req.body.firstname;
		var lastname = req.body.lastname;
		var email = req.body.email;
		var gender = req.body.gender;
		var ownsVehicle = req.body.OwnsVehicle;
		var EnableRideShare = req.body.enableRS;

		updateP.updateP(pno,password,firstname,lastname,email,gender,ownsVehicle,EnableRideShare, function (found) {
			console.log(found);
			res.json(found);
		});
	});
	
app.post('/getOrder',function(req,res){
		var pno = req.body.pNo;

		getOrder.getOr(pno,function (found) {
			console.log(found);
			res.json(found);
		});
	});


app.listen(port, ip);

