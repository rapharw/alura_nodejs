var app = require('./config/express-config')();

var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 
app.listen(port, ip_address, function () {
  console.log( "Listening on " + ip_address + ", port " + port )
});