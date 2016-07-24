var express = require('express');
var session = require('express-session');
var u2f = require('u2f');
var app = express();
var bodyParser = require('body-parser');
var config = require('./config');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(config.appId);

app.get('/svr/u2f/register', function(req, res) {
  var u2f_req = u2f.request(config.appId);
  session.authRequest = u2f_req;
  res.json(u2f_req);
});

app.post('/svr/u2f/register', function(req, res) {
  var checkres = u2f.checkRegistration(session.authRequest, req.body);
  console.log("publicKey: " + checkres.publicKey);
  console.log("keyHandle: " + checkres.keyHandle);
  res.json(checkres)
});

app.post('/svr/u2f/challenge', function(req, res) {
  var user = req.body;
  var u2f_req = u2f.request(config.appId, user.keyHandle);
  session.authRequest = u2f_req;
  session.user = user;
  res.json(u2f_req)
});

app.post('/svr/u2f/challenge_response', function(req, res) {
  var checkres = u2f.checkSignature(session.authRequest, req.body, session.user.publicKey);
  res.json(checkres);
});

module.exports = app;