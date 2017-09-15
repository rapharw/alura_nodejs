module.exports = function(app){

    
    var methodMongodbconn = "/mongodbtestconn";
    app.get(methodMongodbconn, function(req, res){
        var conn = app.repository.MongoConnFactory();
        res.send("SUCCESS");
    });
}