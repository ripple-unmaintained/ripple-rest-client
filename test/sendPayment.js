var Client = require('../');
var assert = require('assert');
var request = require('request');
var sinon = require('sinon');
var uuid = require('node-uuid');

describe('Ripple REST Client sendPayment', function() {
  var client;

  before(function () {
    client = new Client({
      account: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr'
    });
  });

  it('should send payment', function(done){
    var payment = {
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
      secret: '<secret>'
    };

    client.sendPayment(paymentObj, function(error, response){
      assert.strictEqual(response.success, true);
      assert.strictEqual(response.client_resource_id, paymentObj.client_resource_id);
      done();
    });

  });

  it('should fail because it\'s missing source_account', function(done){
    var payment = {
      source_account: '',
      source_amount: { value: '1', currency: 'XRP', issuer: '' },
      destination_account: 'ra9EVPRsiqncEfrRpJudDV34AqxFao8Zv9',
      destination_amount: { value: '1', currency: 'XRP', issuer: '' },
      partial_payment: false,
      no_direct_ripple: false
    };

    var paymentObj = {
      payment: payment,
      client_resource_id: uuid.v4(),
      secret: '<secret>'
    };

    client.sendPayment(paymentObj, function(error, response){
      assert.strictEqual(response.success, false);
      done();
    });

  });
});