module.exports = function(app){
    var methodHello = '/hello';
    app.post(methodGETHello, function(req, resp){
        console.log('invoking ' + methodHello);
    
        resp.send({'return':'success'});
        resp.status(200);
    });
}