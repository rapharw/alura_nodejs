var MongoClient = require('mongodb').MongoClient;

function testConnection(invoke){
    var url = "mongodb://<dbuser>:<dbpass>@<dbhost>/<dbname>";
    MongoClient.connect(url, function(err, db) {
        if(!err){
            console.log("Connected correctly to server.");
            if(invoke){
                console.log("Invoking " + invoke);
                invoke();
            }
            db.close();
        }
        else{
            console.log(err);
        }
    });
}

module.exports = function(invoke){
    return testConnection;
}