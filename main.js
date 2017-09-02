var app = require('./config/express-config')();

var port = 3000;

app.listen(port, function(){
    console.log('server listening on port ' + port);
});