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


  it('should get trust lines of accounts', function(done){

    var options = {
      fromAccount: client.account
    };

    client.getTrustLines(options, function(error, response){
      assert.strictEqual(options.fromAccount, response[0].account);
      done();
    });
  });

  it('should fail because of missing account', function(done){
    client.account = '';

    var options = {
      fromAccount: ''
    };

    client.getTrustLines(options, function(error, response){
      assert(!response);
      done();
    });
  });

});
