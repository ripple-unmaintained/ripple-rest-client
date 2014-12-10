const Client = require('../');
const assert = require('assert');
const fixtures = require('./fixtures');

describe('Ripple REST Client buildPayment', function() {
  var client;

  before(function () {
    client = new Client({
      account: fixtures.ripple_address.source_account
    });
  });

  it('should successfully build payment', function(done){

    var newPayment = {
      currency: 'XRP',
      amount: 0.05,
      recipient: fixtures.ripple_address.destination_account,
      source_currencies: ['USD','XRP']
    };


    client.buildPayment(newPayment, function(error, response){
      assert(response);
      assert(response.payments);
      assert(response.payments.length > 0);
      assert(response.payments[0].source_account, fixtures.ripple_address.source_account);
      assert.strictEqual(response.success, true);
      done();
    });
  });

  it('should fail due to an empty payment object', function(done){
    var newPayment = {};

    client.buildPayment(newPayment, function(error, response){
      assert.strictEqual(error.success, false);
      assert.strictEqual(error.error_type, 'invalid_request');
      done();
    });
  });
});