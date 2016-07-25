var express = require('express');
var session = require('express-session');
var u2f = require('u2f');
var app = express();
var bodyParser = require('body-parser');
var config = require('./config');
var crypto = require('crypto');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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



var crypto = require('crypto');
var fetch = require('node-fetch');

app.post('/svr/crypto', function(req, response) {
  var user = req.body;
  var userId = user.email;
  var ip = "127.0.0.1";
  var time = Math.round( (new Date()).getTime() / 1000 );
  var publicKey = "3322626de9c215345fdc1f8c8103f2a2";
  var privateKey = "a88e7924a216986b8f81e47a471f3fcb";
  var salt = "--random--string--";
  var sig = privateKey + time + userId + publicKey;

  sigHash = crypto.createHmac('sha1', privateKey).update(sig).digest('hex');

  var data = "publickey=" + publicKey + "&uid=" + userId + "&time=" + time + "&signature=" + sigHash +"&ip=" + ip;

  fetch("https://cryptophoto.com/api/get/session", {
    method: 'POST',
    body: data
  })
  .then( function(res) {
    return res.text()
  })
  .then( function(text) {
    var res = text.split("\n");

    var obj = {
      is_valid: res[0] === "success",
      sid: res[1],
      has_token: res[2] === "true"
    };

    console.log(obj);

    response.json(obj)
  })

});

app.post('/svr/crypto_verify', function(req, response) {

  var challenge_response = req.body;
  var userId = challenge_response.email;
  var ip = "127.0.0.1";
  var time = Math.round( (new Date()).getTime() / 1000 );
  var publicKey = "3322626de9c215345fdc1f8c8103f2a2";
  var privateKey = "a88e7924a216986b8f81e47a471f3fcb";
  var salt = "--random--string--";
  var sig = privateKey + time + userId + publicKey;

  sigHash = crypto.createHmac('sha1', privateKey).update(sig).digest('hex');

  var data = "publickey=" + publicKey +
             "&uid=" + userId +
             "&time=" + time +
             "&signature=" + sigHash +
             "&ip=" + ip +
             "&response_row=" + challenge_response.token_response_field_row +
             "&response_col=" + challenge_response.token_response_field_col +
             "&selector=" + challenge_response.cp_selector +
             "&cph=" + challenge_response.token_phc;

  fetch("https://cryptophoto.com/api/verify", {
    method: 'POST',
    body: data
  })
  .then( function(res) {
    return res.text()
  })
  .then( function(text) {
    console.log(text);
    var res = text.split("\n");
    var obj = {
      is_valid: res[0] === "success",
    };
    response.json(obj)

  })

});



app.get('/svr/requestbin', function(req, response) {

  var code = req.query.code;

  fetch("http://requestb.in/" + code, {
    method: 'POST',
    body: "fizz=buzz"
  });

  response.send("ok")

});



module.exports = app;