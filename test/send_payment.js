const Client = require('../');
const assert = require('assert');
const fixtures = require('./fixtures');
const uuid = require('node-uuid');

var SECRET = process.env.RIPPLE_ACCOUNT_SECRET;

describe('Ripple REST Client sendPayment', function() {
  var client, payment, nonXRPayment;

  before(function () {
    client = new Client({
      account: fixtures.ripple_address.source_account
    });
  });

  if(SECRET){
    it('should send payment', function(done){
      this.timeout(5000);
      payment = {
        source_account: fixtures.ripple_address.source_account,
        source_amount: { value: '0.05', currency: 'SWD', issuer: '' },
        destination_account: fixtures.ripple_address.destination_account,
        destination_amount: { value: '0.056', currency: 'SWD', issuer: fixtures.ripple_address.source_account },
        partial_payment: false,
        no_direct_ripple: false,
        destination_tag: '0'
      };
      var paymentObj = {
        payment: payment,
        client_resource_id: uuid.v4(),
        secret: fixtures.ripple_address.source_account_secret
      };

      client.sendPayment(paymentObj, function(error, response){
        assert.strictEqual(response.success, true);
        assert.strictEqual(response.client_resource_id, paymentObj.client_resource_id);
        payment.status_url = response.status_url;
        done();
      });

    });

  } else {
    it.skip('skipping this test because secret is not provided.');
  }

  it('should fail because it\'s missing source_account and secret', function(done){
    var failedPayment = {
      source_account: '',
      source_amount: { value: '1', currency: 'XRP', issuer: '' },
      destination_account: fixtures.ripple_address.destination_account,
      destination_amount: { value: '1', currency: 'XRP', issuer: '' },
      partial_payment: false,
      no_direct_ripple: false,
      destination_tag: '0'
    };

    var paymentObj = {
      payment: failedPayment,
      client_resource_id: uuid.v4(),
      secret: fixtures.ripple_address.source_account_secret
    };

    client.sendPayment(paymentObj, function(error, response){
      assert(!error.success);
      assert(error.error_type, 'invalid_request');
      assert(error.error, 'Invalid parameter: source_account');
      done();
    });
  });

});
