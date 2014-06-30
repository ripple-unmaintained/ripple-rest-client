var Client = require('../');
var assert = require('assert');
var request = require('request');

describe('Ripple REST Client getTrustLines', function() {
  var client;

  before(function () {
    client = new Client({
      account: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr'
    });
  });


  it('should get trust lines of account', function(done){

    var options = {
      fromAccount: client.account
    };

    client.getTrustLines(options, function(error, response){
      assert.strictEqual(typeof response, 'object');
      assert.strictEqual(options.fromAccount, response[0].account);
      done();
    });
  });

  it('should show trust lines between two specific accounts', function(done){

    var options = {
      fromAccount: client.account,
      toAccount: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz'
    };

    client.getTrustLines(options, function(error, response){
      assert.strictEqual(typeof response, 'object');
      assert.strictEqual(options.fromAccount, response[0].account);
      assert.strictEqual(options.toAccount, response[0].counterparty);
      console.log(response);
      done();
    });
  });

  it('should show trust lines between two specific accounts and currency', function(done){

    var options = {
      fromAccount: client.account,
      toAccount: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz',
      currency: 'SWD'
    };

    client.getTrustLines(options, function(error, response){
      assert.strictEqual(typeof response, 'object');
      assert.strictEqual(options.fromAccount, response[0].account);
      assert.strictEqual(options.toAccount, response[0].counterparty);
      assert.strictEqual(options.currency, response[0].currency);
      done();
    });
  });

  it('should fail because of missing account', function(done){
    client.account = '';

    var options = {
      fromAccount : client.account
    };

    client.getTrustLines(options, function(error, response){
      assert(!response);
      done();
    });
  });

});
