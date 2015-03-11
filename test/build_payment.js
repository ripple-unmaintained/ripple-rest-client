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
      currency: 'GWD',
      amount: 10,
      recipient: fixtures.ripple_address.destination_account,
      source_currencies: ['GWD'],
      from_issuer: fixtures.ripple_address.destination_account,
      to_issuer: fixtures.ripple_address.destination_account
    };

    client.buildPayment(newPayment, function(error, response){
      assert(!error);
      assert.deepEqual(fixtures.responses['1_4_0'].success.buildPayment, response);
      done();
    });
  });

  it('should successfully build payment with multiple source currencies', function(done){

    var newPayment = {
      currency: 'GWD',
      amount: 10,
      recipient: fixtures.ripple_address.destination_account,
      source_currencies: ['GWD', 'USD'],
      from_issuer: fixtures.ripple_address.destination_account,
      to_issuer: fixtures.ripple_address.destination_account
    };

    client.buildPayment(newPayment, function(error, response){
      assert(!error);
      assert.deepEqual(fixtures.responses['1_4_0'].success.buildPaymentMultipleSourceCurrencies, response);
      done();
    });

  });

  it('should fail due to an empty payment object', function(done){
    var newPayment = {};
    client.buildPayment(newPayment, function(error, response){
      assert(!response);
      assert.deepEqual(fixtures.responses['1_4_0'].errors.invalid_request, error);
      done();
    });
  });
});