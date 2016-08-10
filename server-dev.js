var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack-dev.config');
var app = require('./server');
var https = require('https');
var fs = require('fs');

new WebpackDevServer(webpack(config), {
    https: true,
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
        "/svr/*": "http://localhost:3001",
        "/info": "http://localhost:3001"
    }
}).listen(3000, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }
    console.log('Webpack listening at https://localhost:3000/');
});

var server = app.listen(3001, function(err) {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Express listening at http://%s:%s', host, port);
});
