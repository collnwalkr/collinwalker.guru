var express = require('express');
//var path    = require("path");
var app = express();

/*
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/production/index.html'));
});

app.get('/test', function(req, res) {
    res.sendFile(path.join(__dirname + '/production/templates/test.html'));
});
*/

app.use(express.static('production'));

app.listen(8080);