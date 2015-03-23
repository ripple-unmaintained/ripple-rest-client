'use strict';

var Client = require('../');
var assert = require('chai').assert;
var account_info = require('./fixtures/account_info')();
var errorFixture = require('./fixtures/update_account_settings').error;
var success = require('./fixtures/update_account_settings').success;
var SECRET = process.env.RIPPLE_ACCOUNT_SECRET;

describe('Ripple REST Client Update Account Settings', function() {
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

  if (SECRET) {
    it('should set require destination tag', function(done) {
      var optsHotWallet = {
        account: account_info.source_account,
        data: {
          secret: account_info.source_account_secret,
          settings: {
            require_destination_tag: false,
            disallow_xrp: false
          }
        }
      };

      client.updateAccountSettings(optsHotWallet, function(error, settings) {
        assert(!error);
        assert(settings);
        assert.deepEqual(success(settings), settings);
        done();
      });
    });

    it('should fail to set require destination tag', function(done) {
      var optsHotWallet = {
        account: account_info.source_account,
        data: {}
      };

      client.updateAccountSettings(optsHotWallet, function(error, settings) {
        assert(error);
        assert(!settings);
        assert.deepEqual(errorFixture(), error.response.body);
        done();
      });
    });
  } else {
    it.skip('should fail because destination account and amount is missing -- MISSING SECRET, so skipping test');
  }
});
