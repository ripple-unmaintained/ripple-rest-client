'use strict';

var Client = require('../');
var assert = require('chai').assert;
var account_info = require('./fixtures/account_info')();
var success = require('./fixtures/get_server_status').success;

describe('Ripple REST Client Get Server Status', function() {
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

  it('should successfully get server status', function(done) {
    client.getServerStatus(null, function(error, response) {
      assert(!error);
      assert(response);
      assert.deepEqual(success(response), response);
      done();
    });
  });
});
