'use strict';

var Client = require('../');
var assert = require('assert');
var account_info = require('./fixtures/account_info')();
var success = require('./fixtures/get_payments').success;
var errorFixture = require('./fixtures/get_payments').error;

describe('Ripple REST Client Get Payments', function() {
  var client;
  var payments;

  beforeEach(function(done) {
    client = new Client({
      account: account_info.source_account
    });

    client.getPayments(null, function(error, payment_array) {
      payments = payment_array;
      done();
    });
  });

  afterEach(function(done) {
    client = undefined;
    done();
  });

  // Given the hash for the second last payment, the response should contain the
  // hashes of last payment and third last payment.
  it('should get notifications', function(done) {
    client.getPayment(payments[0].hash, function(error, response) {
      assert(payments);
      assert(response);
      assert(success(response), response);
      done();
    });
  });

  it('should fail due to invalid transaction', function(done) {
    client.getPayment('FakeHash', function(error, response) {
      assert(error);
      assert(!response);
      assert.deepEqual(errorFixture(), error.response.body);
      done();
    });
  });
});
