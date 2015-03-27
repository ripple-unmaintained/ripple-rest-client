'use strict';

var Client = require('../');
var assert = require('chai').assert;

describe('Ripple REST Client Get Transaction Fee', function() {

  it('should successfully get transaction fee', function(done) {
    var client = new Client({});

    client.getTransactionFee(function(error, response) {
      assert(!error);
      assert(response);
      assert(response.success);
      assert(response.fee);
      done();
    });
  });
});
