var MongoClient = require('mongodb').MongoClient;
var url = process.env.OPENSHIFT_MONGODBURL || "mongodb://<dbuser>:<dbpass>@<dbhost>/<dbname>";

function MongoConnFactory(){}

MongoConnFactory.prototype.findAll = function(collection, callback){
    MongoClient.connect(url, function(err, db) {
        if(!err){
            var cursor = db.collection(collection).find().toArray(function(err, results) {
                console.log(results);
                callback(results);
            });
            db.close();
        }
        else{
            console.log(err);
            callback(results);
        }
    });
}

module.exports = function(){
    return MongoConnFactory;
}