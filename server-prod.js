var https = require('https');
var fs = require('fs');
var app = require('./server');
var express = require('express');
var path = require('path');
var config = require('./config');

app.use(express.static('public'));
app.use('/static', express.static('dist'));
app.use('/govuk_template', express.static('govuk_template'));
app.use('/public', express.static('public'));
app.use('/docs', express.static('docs'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

var s = app;

if ( config.https ) {
    s = https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app)
}

var port = process.env.PORT || 3000;

var server = s.listen(port, function(err) {
    var host = server.address().address;
    var port = server.address().port;
    var proto = config.https ? "https" : "http";
    console.log('Express listening at ' + proto +'://%s:%s', host, port);
});


