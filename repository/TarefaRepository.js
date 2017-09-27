var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var url = process.env.OPENSHIFT_MONGODBURL || "mongodb://<dbuser>:<dbpass>@<dbhost>/<dbname>";

function TarefaRepository(){}

TarefaRepository.prototype.validaId = function(id, callback){
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
TarefaRepository.prototype.findAll = function(collection, callback){
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
TarefaRepository.prototype.findById = function(collection, id, callback){
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
TarefaRepository.prototype.find = function(collection, params, callback){
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
TarefaRepository.prototype.insertOne = function(collection, document, callback){
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
 * inativa um documento na collection de acordo com um Document informado
 */
TarefaRepository.prototype.updateOne = function(collection, document, status, callback){
    document.idc_status = status;
    MongoClient.connect(url, function(err, db) {
        db.collection(collection).findOneAndUpdate(
                                            {_id: ObjectID(document._id)}, 
                                            {$set: document},
                                            function(err, results) {
            if (err) throw err;
            callback(results);
        });
        db.close();
    });
}


/**
 * Remove um registro na collection
 */
TarefaRepository.prototype.removeByDocument = function(collection, document, callback){
    MongoClient.connect(url, function(err, db) {
        db.collection(collection).remove(document, function(err, results) {
            if (err) 
                throw err;
            callback(results);
        });
        db.close();
    });
}


/**
 * Remove TODOS os registros na collection
 */
TarefaRepository.prototype.removeAll = function(collection, callback){
    MongoClient.connect(url, function(err, db) {
        db.collection(collection).remove({}, function(err, results) {
            if (err) 
                throw err;
            callback(results);
        });
        db.close();
    });
}

module.exports = function(){
    return TarefaRepository;
}