module.exports = function(app){
    
    function getConnection(app){
        return new app.repository.TarefaRepository();
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
        conn.findById('tarefas', _id , function (document){
            conn = getConnection(app);
            conn.updateOne('tarefas', document , "INATIVO", function (results){
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
        var _id = req.params.id;
        var conn = getConnection(app);
        conn.findById('tarefas', _id , function (document){
            conn = getConnection(app);
            conn.updateOne('tarefas', document , "ATIVO", function (results){
                if(results){
                    res.send({msg: "SUCCESS"})
                }
                else
                    res.send({msg: "ERRO", dsc: "Erro ao reativar a tarefa"});
            });
        });
        
    });



    /**
     * Remove todos os registros da collection
     */
    app.delete("/tarefa", function(req, res){
        var conn = getConnection(app);
        conn.removeAll('tarefas', function (results){
            if(results){
                res.send({msg: "SUCCESS"})
            }
            else
                res.send({msg: "ERRO", dsc: "Erro ao zerar collection"});
        });
    });


    /**
     * Remove uma tarefa
     */
    app.purge("/tarefa/:id", function(req, res){
        var _id = req.params.id;
        var conn = getConnection(app);
        conn.findById('tarefas', _id , function (document){
            conn = getConnection(app);
            conn.removeByDocument('tarefas', document, function (results){
                if(results){
                    res.send({msg: "SUCCESS"})
                }
                else
                    res.send({msg: "ERRO", dsc: "Erro ao inativar a tarefa"});
            });
        });
        
    });
}