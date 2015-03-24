'use strict';

var Client = require('../');
var assert = require('assert');
var account_info = require('./fixtures/account_info')();
var success = require('./fixtures/get_trust_lines').success;
var errorFixture = require('./fixtures/get_trust_lines').error;
var _ = require('lodash');

describe('Ripple REST Client Get Trustlines', function() {
  var client;

  beforeEach(function(done) {
    client = new Client({
      account: account_info.source_account
    });
    done();
  });

  afterEach(function(done) {
    client = undefined;
    done();
  });

  it('should get trust lines of accounts', function(done) {
    client.getTrustLines(client.account, function(error, response) {
      assert(!error);
      assert(response);
      assert(_.isArray(response));
      _.forEach(response, function(value) {
        var fixture = success(value);
        assert.deepEqual(fixture, value);
      });
      done();
    });
  });

  it('should fail to get trust lines of accounts', function(done) {
    client = new Client({});
    client.getTrustLines('FakeAccount', function(error, response) {
      assert(error);
      assert(!response);
      assert.deepEqual(errorFixture(), error.response.body);
      done();
    });
  });
});
