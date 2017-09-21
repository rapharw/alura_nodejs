var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var url = process.env.OPENSHIFT_MONGODBURL || "mongodb://<dbuser>:<dbpass>@<dbhost>/<dbname>";

function MongoConnFactory(){}

/**
 * Busca todos os elementos da Collection
 */
MongoConnFactory.prototype.findAll = function(collection, callback){
    MongoClient.connect(url, function(err, db) {
        if(!err){
            var cursor = db.collection(collection).find().toArray(function(err, results) {
                callback(results);
            });
        }
        else{
            console.log(err);
            callback(results);
        }
        db.close();
    });
}

/**
 * Faz a busca pelo id
 */
MongoConnFactory.prototype.findById = function(collection, id, callback){
    MongoClient.connect(url, function(err, db) {
        if(err)
            throw err;
            db.collection(collection).findOne({_id: ObjectID(id)}, function(err, results) {
                callback(results);
            });
    
        db.close();
    });
}

/**
 * Faz a busca pelos parametros passados, retornando um array
 */
MongoConnFactory.prototype.find = function(collection, params, callback){
    MongoClient.connect(url, function(err, db) {
        if(err)
            throw err;

        db.collection(collection).find(params).toArray(function(err, results) {
            callback(results);
        });
    
        db.close();
    });
}

/**
 * Insere um registro na collection
 */
MongoConnFactory.prototype.insertOne = function(collection, document, callback){
    document.idc_status = "ATIVO";
    MongoClient.connect(url, function(err, db) {
        db.collection(collection).insertOne(document, function(err, results) {
            if (err) 
                throw err;
            console.log(results.insertedId);
            callback(results);
        });
        db.close();
    });
}


/**
 * remove um registro na collection
 */
MongoConnFactory.prototype.remove = function(collection, document, callback){
    document.idc_status = "INATIVO";
    console.log("Preparando para atualizar: " + JSON.stringify(document));
    MongoClient.connect(url, function(err, db) {
        db.collection(collection).updateOne(
                                            {_id: ObjectID(document.id)}, 
                                            {$set: document},
                                            function(err, results) {
            if (err) throw err;
            callback(results);
        });
        db.close();
    });
}


module.exports = function(){
    return MongoConnFactory;
}