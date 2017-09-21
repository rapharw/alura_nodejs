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
        
        var conn = getConnection(app);
        conn.insertOne('tarefas', tarefa , function (results){
            if(results){
                //res.send({msg: "SUCCESS", id: results.insertedId});	
                res.redirect("/tarefa/" + results.insertedId);
            }
            else{
                res.send({msg: "ERRO", dsc: "Erro ao criar a tarefa"});
            }
        });
        
    });

    /**
     * Inativa uma tarefa
     */
    app.delete("/tarefa/:id", function(req, res){
        var _id = req.params.id;
        var conn = getConnection(app);

        console.log("Inativando o recurso de ID: " + _id);

        conn.findById('tarefas', _id , function (document){
            
            console.log("Retornou o documento: " + JSON.stringify(document));

            conn.remove('tarefas', document , function (results){
                if(results){
                    res.send({msg: "SUCCESS"})
                }
                else
                    res.send({msg: "ERRO", dsc: "Erro ao inativar a tarefa"});
            });
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