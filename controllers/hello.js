module.exports = function(app){
    var methodGETHello = '/hello';
    app.post(methodGETHello, function(req, resp){
        console.log('invoking ' + methodGETHello);
    
        resp.send({'return':'success'});
        resp.status(200);
    });
}