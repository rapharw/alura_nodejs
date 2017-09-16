module.exports = function(app){
    
    var methodMongodbconn = "/mongodbtestconn";
    app.get(methodMongodbconn, function(req, res){
        var repository = new app.repository.MongoConnFactory();
        repository.findAll('tarefas', function (results){
            res.send(results);
        });
    });
}