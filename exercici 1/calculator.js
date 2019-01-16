var http_port = 1307;
var http = require('http');
var server = http.createServer(function (req, res) {
    // Tractem els paràmetres de req
    var url = require('url');
    req.requrl = url.parse(req.url, true);
    req.a = (req.requrl.query.a && (!isNaN(req.requrl.query.a)) ? new Number(req.requrl.query.a) :
        NaN);
    req.b = (req.requrl.query.b && (!isNaN(req.requrl.query.b)) ? new Number(req.requrl.query.b) :
        NaN);
    // Triem segons la ruta
    if (req.requrl.pathname === '/') {
        // A l'arrel mostrem el menú
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(
            ["<ul><li><a href='/suma'>suma</a></li>",
                "<li><a href='/resta'>resta</a></li>",
                "<li><a href='/multiplicacio'>multiplicacio</a></li>",
                "<li><a href='/divisio'>divisio</a></li></ul>"].join('\n'));

    } else if (req.requrl.pathname === '/suma') {
        require('./suma').get(req, res);
    } else if (req.requrl.pathname === '/resta') {
        require('./resta').get(req, res);
    }else if (req.requrl.pathname === '/multiplicacio') {
        require('./multiplicacio').get(req, res);
    }else if (req.requrl.pathname === '/divisio') {
    require('./divisio').get(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("URL incorrecte " + req.url);
    }
});
server.listen(http_port);
console.log('Escoltant a http://localhost:' + http_port);