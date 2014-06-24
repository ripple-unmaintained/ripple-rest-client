var Client = require('../');
var assert = require('assert');
var request = require('request');
var sinon = require('sinon');
var uuid = require('node-uuid');

var SECRET = process.env.RIPPLE_ACCOUNT_SECRET;

describe('Ripple REST Client sendPayment', function() {
  var client, payment;

  before(function () {
    client = new Client({
      account: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr'
    });
  });

  if(SECRET){
    it('should send payment', function(done){
      payment = {
        source_account: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz',
        source_amount: { value: '1', currency: 'XRP', issuer: '' },
        destination_account: 'ra9EVPRsiqncEfrRpJudDV34AqxFao8Zv9',
        destination_amount: { value: '1', currency: 'XRP', issuer: '' },
        partial_payment: false,
        no_direct_ripple: false
      };

      var paymentObj = {
        payment: payment,
        client_resource_id: uuid.v4(),
        secret: SECRET
      };

      client.sendPayment(paymentObj, function(error, response){
        assert.strictEqual(response.success, true);
        assert.strictEqual(response.client_resource_id, paymentObj.client_resource_id);
        payment.status_url = response.status_url;
        done();
      });

    });
  } else {
    it.skip('should send payment');
  }


  it('should payment status response must match', function(done){
    client.getPaymentStatus(payment.status_url, function(error, response){
      assert.strictEqual(response.source_account, payment.source_account);
      assert.strictEqual(response.destination_account, payment.destination_account);
      done();
    });
  });

  it('should fail because it\'s missing source_account and secret', function(done){
    var failedPayment = {
      source_account: '',
      source_amount: { value: '1', currency: 'XRP', issuer: '' },
      destination_account: 'ra9EVPRsiqncEfrRpJudDV34AqxFao8Zv9',
      destination_amount: { value: '1', currency: 'XRP', issuer: '' },
      partial_payment: false,
      no_direct_ripple: false
    };

    var paymentObj = {
      payment: failedPayment,
      client_resource_id: uuid.v4(),
      secret: SECRET
    };

    client.sendPayment(paymentObj, function(error, response){
      assert.strictEqual(response.success, false);
      done();
    });

  });

});
