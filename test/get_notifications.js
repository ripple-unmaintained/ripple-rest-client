var Client = require('../');
var assert = require('chai').assert;
var account_info = require('./fixtures/account_info')();
var errorFixture = require('./fixtures/get_notifications').error;
var success = require('./fixtures/get_notifications').success;

describe.only('Ripple REST Client Get Notifications', function() {
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

  it('should get notifications', function(done) {
    client.getNotifications(function(error, response) {
      if (error) {
        return done(error);
      }
      assert(response.length > 0, 'No notifications');
      assert.deepEqual(success(response[0]), success(response[0]));
      done();
    });
  });
});
