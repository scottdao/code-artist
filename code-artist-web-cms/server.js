var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, resp) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            resp.writeHead(404, { 'Content-Type': 'text/html' });
            resp.write("404");
        } else {
            resp.writeHead(200, { 'Content-Type': 'text/html' });
            resp.write(data.toString());
        }
        resp.end();
    });
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');