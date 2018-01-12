var express = require('express');
var app = express();

app.get('/:id/:name', function (req, res) {
    res.send(req.params.id + ":" + req.params.name);
});

var server = app.listen(8081);