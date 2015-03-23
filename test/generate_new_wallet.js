'use strict';

var Client = require('../');
var assert = require('chai').assert;

describe('Ripple REST Client Generate Build Payment', function() {
  var client;

  beforeEach(function(done) {
    client = new Client({});
    done();
  });

  afterEach(function(done) {
    client = undefined;
    done();
  });

  it('should generate a new ripple wallet with secret', function(done) {

    client.generateNewWallet(function(error, response) {
      assert(!error, 'API call failed');
      assert(response, 'response is null');
      assert(response.address);
      assert(response.secret);
      done();
    });
  });
});
