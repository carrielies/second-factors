"use strict";

var assert = require('chai').assert;

describe('Blah', function() {
  describe('#docde', function() {

    let req = {
      version: "U2F_V2",
      appId: "https://localhost:3000",
      challenge: "bAwnaQ0EPaV1u1L7ySA7rB4rKwAffHO2yCb2H31CQPA"
    };

    let resp = {
      appId: "https://localhost:3000",
      challenge: "bAwnaQ0EPaV1u1L7ySA7rB4rKwAffHO2yCb2H31CQPA",
      clientData: "eyJ0eXAiOiJuYXZpZ2F0b3IuaWQuZmluaXNoRW5yb2xsbWVudCIsImNoYWxsZW5nZSI6ImJBd25hUTBFUGFWMXUxTDd5U0E3ckI0ckt3QWZmSE8yeUNiMkgzMUNRUEEiLCJvcmlnaW4iOiJodHRwczovL2xvY2FsaG9zdDozMDAwIiwiY2lkX3B1YmtleSI6InVudXNlZCJ9",
      registrationData: "BQQ_d9TcfNN-xIrUVU-OyERntMhKoGDb_jAgvcxzJSBsU_8vRpvRDoguvehSJjo6ZKhf50dzSmhrEVTe1EpgVSlNQKXhUG1bFp1jjAJNh-rJg6jbEG1daxpzFJBWSF0T8QGiZbnCKvbLa4m7PkruXjujZzA_YI5BqeY15DVQZMc5bfMwggE8MIHkoAMCAQICChlFiGBmRWaIdkgwCgYIKoZIzj0EAwIwFzEVMBMGA1UEAxMMRlQgRklETyAwMTAwMB4XDTE0MDgxNDE4MjkzMloXDTI0MDgxNDE4MjkzMlowMTEvMC0GA1UEAxMmUGlsb3RHbnViYnktMC40LjEtMTk0NTg4NjA2NjQ1NjY4ODc2NDgwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQ_d9TcfNN-xIrUVU-OyERntMhKoGDb_jAgvcxzJSBsU_8vRpvRDoguvehSJjo6ZKhf50dzSmhrEVTe1EpgVSlNMAoGCCqGSM49BAMCA0cAMEQCIPTBC8-APrDgbgraKiMBZ4LbJGHvXmZoYBSCKpPqeeF4AiAfdmXHjzzpqmQ1ogzATdjZI4r0jxqVEsCnNocEPKPnezBEAiAe9FwrOJ42-4FSNmjbnbQVmBSyVUF69EKhRW1ZhgawhAIgVIBYyr-jnIV5LJ961N9Ok-CcRIH9OMTb5n3FmQMQpX4",
      version: "U2F_V2"
    };

    it('should do something', function() {
      console.log(crypto)
    });
  });
});
