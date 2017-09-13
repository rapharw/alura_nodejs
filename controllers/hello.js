module.exports = function(app){
    var methodHello = '/hello';
    app.post(methodHello, function(req, resp){
        resp.send({'return':'success'});
        resp.status(200);
    });

    app.get(methodHello, function(req, res) {
        res.sendfile('./public/index.html');
    });
}