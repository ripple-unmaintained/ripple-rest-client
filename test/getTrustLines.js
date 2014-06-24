var Client = require('../');
var assert = require('assert');
var request = require('request');

describe('Ripple REST Client getTrustLines', function() {
  var client;

  before(function () {
    client = new Client({
      account: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr'
    });
  });


  it('should get trust lines between two given accounts', function(done){
    var account = client.account;

    client.getTrustLines(account, function(error, response){
      assert.strictEqual(typeof response, 'object');
      assert.strictEqual(account, response[0].account);
      done();
    });
  });

  it('should fail because of missing account', function(done){
    var account = '';
    client.getTrustLines(account, function(error, response){
      assert(!response);
      done();
    });
  });

});
