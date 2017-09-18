var express = require('express');
var consign = require('consign');
var bodyparser = require('body-parser');
var morgan = require('morgan');

module.exports = function(){
    var app = express();

    app.use(morgan('dev'));
    
    //diz para o express utilizar o module body-parser, com urlencoded
	app.use(bodyparser.urlencoded({extended:true}));
    
    //diz para o express utilizar o module body-parser, convertendo para json
    app.use(bodyparser.json());

    app.use(express.static('./public/'));

    consign()
    .include('controllers')
    .then('repository')
    .into(app);

    return app;
}