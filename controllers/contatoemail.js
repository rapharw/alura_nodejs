module.exports = function(app){

    function getConnection(app){
        return new app.repository.ContatoEmailRepository();
    }

    /**
     * Lista todas as mensagens de contato
     */
    app.get("/contatoemail", function(req, res){
        var conn = getConnection(app);
        conn.findAll('contatoEmail', function (results){
            res.send(results);
        });
    });

    /**
     * Busca uma mensagem de contato pelo ID
     */
    app.get("/contatoemail/:id", function(req, res){
        var _id = req.params.id;
        var conn = getConnection(app);

        conn.validaId(_id, function(idIsValid){
            if(idIsValid == true){
                conn.findById('contatoEmail', _id , function (results){
                    res.send(results);
                });
            }
            else{
                res.send({msg: "ERRO", dsc: "ID Invalido"});
            }
        });
    });

    /**
     * Insere uma nova mensagem de Contato
     */
    app.post('/contatoemail', function(req, res){
        var contatoEmail = req.body;

        contatoEmail.dataEnvio = new Date;
        
        var conn = getConnection(app);
        conn.insertOne('contatoEmail', contatoEmail , function (results){
            if(results){
                res.send({msg: "SUCCESS"})
            }
            else{
                res.status(500);
                res.send({msg: "ERRO", dsc: "Desculpe " + contatoEmail.name + ", parece que houve algum erro ao enviar sua mensagem. Por favor tente mais tarde."});
            }
        });

    });
}