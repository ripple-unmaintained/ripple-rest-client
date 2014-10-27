const Client = require('../');
const assert = require('assert');
const fixtures = require('./fixtures');

describe('Ripple REST Client setTrustLines', function() {
  var client;

  before(function () {
    client = new Client({
      account: fixtures.ripple_address.source_account
    });
  });

  if(fixtures.ripple_address.source_account_secret){
    it('should set trust lines between two given accounts', function(done){
      var trust = {
        account: fixtures.ripple_address.source_account,
        secret: fixtures.ripple_address.source_account_secret,
        limit: 100,
        currency: 'RUU',
        counterparty: fixtures.ripple_address.destination_account
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
      amount: 1,
      currency: 'SWG',
      issuer: fixtures.ripple_address.source_account
    };

    client.setTrustLines(trust, function(error, response){
      assert(!response);
      done();
    });
  });

});
