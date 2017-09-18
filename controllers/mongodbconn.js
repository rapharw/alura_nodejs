module.exports = function(app){
    
    function getConnection(app){
        return new app.repository.MongoConnFactory();
    }

    /**
     * Lista todas as tarefas
     */
    app.get("/tarefa", function(req, res){
        var conn = getConnection(app);
        conn.findAll('tarefas', function (results){
            res.send(results);
        });
    });

    /**
     * Busca a tarefa pelo ID
     */
    app.get("/tarefa/:id", function(req, res){
        var _id = req.params.id;
        var conn = getConnection(app);
        conn.findById('tarefas', _id , function (results){
            res.send(results);
        });
    });

    /**
     * Cria uma nova tarefa
     */
    app.post("/tarefa", function(req, res){
        var tarefa = req.body;
        tarefa.data = new Date;
        
        console.log(tarefa);
        var conn = getConnection(app);
        conn.insertOne('tarefas', tarefa , function (results){
            if(results){
                console.log("CRIADO COM SUCESSO: " + tarefa + " | " + results)
                res.redirect('/tarefa/' + results._id);	
            }
            else
                res.send({"msg": "ERRO AO CRIAR"});
        });
        
    });

    /**
     * Inativa uma tarefa
     */
    app.delete("/tarefa/:id", function(req, res){
        var _id = req.params.id;
        var conn = getConnection(app);
        conn.remove('tarefas', _id , function (results){
            if(results){
                console.log("INATIVADO COM SUCESSO: " + _id + " | " + results)
                res.redirect('/tarefa');	
            }
            else
                res.send({"msg": "ERRO AO INATIVAR"});
        });
        
    });

    /**
     * Reativa uma tarefa
     */
    app.put("/tarefa/:id", function(req, res){
        var id = req.params.id;
        var conn = getConnection(app);
        conn.update('tarefas', id , function (results){
            if(results){
                console.log("REATIVADO COM SUCESSO: " + id + " | " + results)
                res.redirect('/tarefa');	
            }
            else
                res.send({"msg": "ERRO AO REATIVAR"});
        });
        
    });
}