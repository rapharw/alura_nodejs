module.exports = function(app){
    
    var methodMongodbconn = "/mongodbtestconn";
    app.get(methodMongodbconn, function(req, res){
        var repository = new app.repository.MongoConnFactory();
        repository.findAll('tarefas', function (results){
            res.send(results);
        });
    });

    var methodMongodbconn2 = "/mongodbtestconn2/:status";
    app.get(methodMongodbconn2, function(req, res){
        var status = req.params.status;

        var repository = new app.repository.MongoConnFactory();
        repository.find('tarefas',{ 'status': status} , function (results){
            res.send(results);
        });
    });
}