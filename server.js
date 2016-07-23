var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  https: true,
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    "/svr/*": "http://localhost:3001"
  }
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log('Webpack listening at http://localhost:3000/');
});



var express = require('express');
var session = require('express-session');
var u2f = require('u2f');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/svr/u2f/register', function(req, res) {
  var u2f_req = u2f.request("https://localhost:3000");
  session.authRequest = u2f_req;
  res.json(u2f_req);
});

app.post('/svr/u2f/register', function(req, res) {
  var checkres = u2f.checkRegistration(session.authRequest, req.body);
  res.json(checkres)
});

app.post('/svr/u2f/challenge', function(req, res) {
  var user = req.body;
  var u2f_req = u2f.request("https://localhost:3000", user.keyHandle);
  session.authRequest = u2f_req;
  session.user = user;
  res.json(u2f_req)
});

app.post('/svr/u2f/challenge_response', function(req, res) {
  var checkres = u2f.checkSignature(session.authRequest, req.body, session.user.publicKey);
  res.json(checkres);
});




var port = process.env.PORT || 3001;

var server = app.listen(port, function(err) {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Express listening at http://%s:%s', host, port);
});