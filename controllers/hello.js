module.exports = function(app){
    var methodHello = '/hello';
    app.post(methodHello, function(req, resp){
        console.log('invoking ' + methodHello);
        resp.send({'return':'success'});
        resp.status(200);
    });
}