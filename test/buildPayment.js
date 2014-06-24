var Client = require('../');
var assert = require('assert');
var request = require('request');
var sinon = require('sinon');

describe('Ripple REST Client buildPayment', function() {
  var client;

  before(function () {
    client = new Client({
      account: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr'
    });
  });

  it('should build payment', function(done){
    var newPayment = {
      currency: 'XRP',
      amount: 1,
      recipient: 'ra9EVPRsiqncEfrRpJudDV34AqxFao8Zv9'
    };

    if (!newPayment.currency == 'XRP') {
      newPayment.issuer = 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr';
    }

    client.buildPayment(newPayment, function(error, response){
      assert.strictEqual(response.success, true);
      console.log('error', error);
      console.log('error', response.payments[0]);
      done();
    });
  });

  it('should fail', function(done){
    var newPayment = {};

    if (!newPayment.currency == 'XRP') {
      newPayment.issuer = 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr';
    }

    client.buildPayment(newPayment, function(error, response){
      assert.strictEqual(response.success, false);
      console.log('error', error);
      console.log('success', response);
      done();
    });
  });
});