var chgpass = require('config/chgpass');
var register = require('config/register');
var getProfile = require('config/getProfile');
var Login = require('config/login');
var checkUser= require('config/checkUser');
var updateP=require('config/updateProfile');
var order=require('config/order');
var taxilist=require('config/taxiList');
var getOrder=require('config/getOrders');


module.exports = function(app) {



	app.get('/', function(req, res) {

		res.end("Node-Android-Project"); 
	});


	app.post('/login',function(req,res){
		var pno = req.body.pno;
		var password = req.body.password;

		Login.login(pno,password,function (found) {
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

	app.post('/getOrder',function(req,res){
		var pno = req.body.pNo;

		getOrder.getOr(pno,function (found) {
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
	});

	app.get('/taxiList',function(req,res){

		var pno = req.body.pno;
		taxilist.taxilst(pno,function (found) {
			console.log(found);
			res.json(found);
		});
	});


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

	app.post('/order',function(req,res){

		var pno = req.body.pNo;
		var DestinationLon = req.body.DestinationLat;
		var DestinationLat = req.body.DestinationLon;
		var LocationLat = req.body.LocationLat;
		var LocationLon = req.body.LocationLon;
		var OrderID=req.body.orderID;
		var TaxiID=req.body.taxiID;

		order.Order(pno,DestinationLon,DestinationLat,LocationLat,LocationLon,OrderID,TaxiID, function (found) {
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
	

	app.post('/api/chgpass', function(req, res) {
		var id = req.body.id;
                var opass = req.body.oldpass;
		var npass = req.body.newpass;

		chgpass.cpass(id,opass,npass,function(found){
			console.log(found);
			res.json(found);
	});	
	});


	app.post('/api/resetpass', function(req, res) {
	
		var pno = req.body.pno;
		
		chgpass.respass_init(pno,function(found){
			console.log(found);
			res.json(found);
	});		
	});
	

	app.post('/api/resetpass/chg', function(req, res) {
	
		var pno = req.body.pno;
		var code = req.body.code;
		var npass = req.body.newpass;
		
		chgpass.respass_chg(pno,code,npass,function(found){			
			console.log(found);
			res.json(found);
	});		
	});

	
};



