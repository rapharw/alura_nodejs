var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var url = process.env.OPENSHIFT_MONGODBURL || "mongodb://<dbuser>:<dbpass>@<dbhost>/<dbname>";

function ContatoEmailRepository(){}

ContatoEmailRepository.prototype.validaId = function(id, callback){
    try{
        ObjectID(id);
        callback(true);
    }catch(e){
        callback(false);
    }
}

/**
 * Busca todos os elementos da Collection
 */
ContatoEmailRepository.prototype.findAll = function(collection, callback){
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
ContatoEmailRepository.prototype.findById = function(collection, id, callback){
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
 * Insere um registro na collection
 */
ContatoEmailRepository.prototype.insertOne = function(collection, document, callback){
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

module.exports = function(){
    return ContatoEmailRepository;
}