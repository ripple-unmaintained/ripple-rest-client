'use strict';

var Client = require('../');
var assert = require('assert');
var account_info = require('./fixtures/account_info')();
var success = require('./fixtures/get_balance').success;
var errorFixture = require('./fixtures/get_balance').error;

describe('Ripple REST Client Get Balances', function() {

  it('should get balances', function(done) {

    var client = new Client({
      account: account_info.source_account
    });

    client.getAccountBalance(function(error, response) {
      assert(!error);
      assert(response);
      assert.deepEqual(success(response), response);
      done();
    });
  });

  it('should fail to get balances', function(done) {

    var client = new Client({});

    client.getAccountBalance(function(error, response) {
      assert(error);
      assert(!response);
      assert.deepEqual(errorFixture(), error.response.body);
      done();
    });
  });
});
