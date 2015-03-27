'use strict';

var Client = require('../');
var assert = require('chai').assert;
var account_info = require('./fixtures/account_info')();
var success = require('./fixtures/get_transaction').success;
var errorFixture = require('./fixtures/get_transaction').error;

describe('Ripple REST Client Get Transaction', function() {
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
  it('should get transaction', function(done) {
    this.timeout(5000);
    client.getTransaction(payments[0].hash, function(error, response) {
      assert(!error);
      assert(response);
      assert.deepEqual(success(response), response);
      done();
    });
  });

  it('should fail to get transactions', function(done) {

    client.getTransaction('FakeTransaction', function(error, response) {
      assert(error);
      assert(!response);
      assert.deepEqual(errorFixture(), error.response.body);
      done();
    });
  });
});
