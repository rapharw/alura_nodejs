var express = require('express');
var consign = require('consign');

var morgan = require('morgan');

module.exports = function(){
    var app = express();

    app.use(morgan('dev'));

    app.use(express.static('./public/'));

    consign()
    .include('controllers')
    .into(app);

    return app;
}