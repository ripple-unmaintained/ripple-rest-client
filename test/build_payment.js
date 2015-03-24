'use strict';

var Client = require('../');
var assert = require('assert');
var account_info = require('./fixtures/account_info')();
var _ = require('lodash');
var success = require('./fixtures/build_payment').success;
var errorFixture = require('./fixtures/build_payment').error;

describe('Ripple REST Client buildPayment', function() {
  var client;

  beforeEach(function(done) {
    client = new Client({
      account: account_info.source_account,
      secret: account_info.secret,
      from_issuer: account_info.source_account,
      to_issuer: account_info.destination_account
    });
    done();
  });

  afterEach(function(done) {
    client = undefined;
    done();
  });

  it('should successfully build payment', function(done) {

    var newPayment = {
      currency: 'GWD',
      amount: 10,
      recipient: account_info.destination_account,
      source_currencies: ['GWD', 'USD']
    };

    client.buildPayment(newPayment, function(error, response) {
      assert(!error, 'API call failed');
      assert(response, 'Response is null');
      assert(_.isArray(response.payments));
      _.forEach(response.payments, function(value) {
        var fixture = success(value);
        assert.deepEqual(fixture, value);
      });
      done();
    });
  });

  it('should fail due to an empty payment object', function(done) {
    var newPayment = {};
    client.buildPayment(newPayment, function(error, response) {
      assert(!response);
      assert(error);
      assert.deepEqual(errorFixture(), error.response.body);
      done();
    });
  });
});
