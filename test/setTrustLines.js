var Client = require('../');
var assert = require('assert');
var request = require('request');

var SECRET = process.env.RIPPLE_ACCOUNT_SECRET;

describe('Ripple REST Client getTrustLines', function() {
  var client;

  before(function () {
    client = new Client({
      account: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz'
    });
  });

  if(SECRET){
    it('should set trust lines between two given accounts', function(done){
      var trust = {
        secret: SECRET,
        limit: 1,
        currency: 'SWG',
        counterparty: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr'
      };

      client.setTrustLines(trust, function(error, response){
        assert.strictEqual(typeof response, 'object');
        assert.strictEqual(client.account, response.account);
        done();
      });
    });
  } else {
    it.skip('should get trust lines between two given accounts');
  }

  it('should fail because of missing secret', function(done){
    var trust = {
      secret: '',
      limit: 1,
      currency: 'SWG',
      counterparty: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr'
    };

    client.setTrustLines(trust, function(error, response){
      assert(!response);
      done();
    });
  });

});
