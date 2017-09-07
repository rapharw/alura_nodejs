var app = require('./config/express-config')();

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

if('127.0.0.1' == ip_address){
	app.listen(port, function () {
	  console.log( "Listening on port " + port );
	});	
} 
else{
	app.listen(port, ip_address, function () {
	  console.log( "Listening on " + ip_address + ", port " + port )
	});	
}