'use strict';

var Client = require('../');
var assert = require('chai').assert;
var account_info = require('./fixtures/account_info')();

describe('Ripple REST Client Generate UUID', function() {
  it('should successfully get UUID', function(done) {
    var client = new Client({
      account: account_info.source_account
    });

    client.generateUUID(function(error, response) {
      assert(response);
      done();
    });
  });
});
