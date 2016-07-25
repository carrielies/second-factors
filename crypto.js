var crypto = require('crypto');
var fetch = require('node-fetch');

var userId = "mark";
var ip = "127.0.0.1";
var time = Math.round( (new Date()).getTime() / 1000 );
var publicKey = "3322626de9c215345fdc1f8c8103f2a2";
var privateKey = "a88e7924a216986b8f81e47a471f3fcb";
var salt = "--random--string--";
var sig = privateKey + time + userId + publicKey;

sigHash = crypto.createHmac('sha1', privateKey).update(sig).digest('hex');
console.log(sigHash)

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
})
