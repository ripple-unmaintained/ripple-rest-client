var Client = require('../lib/client');
var assert = require('assert');
var sinon = require('sinon');
var request = require('request');

var recipient = 'rp4u5gEskM8DtBZvonZwbu6dspgVdeAGM6';
var gateway = 'rJMNfiJTwXHcMdB4SpxMgL3mvV4xUVHDnd'

describe('Ripple REST Client', function(){
  before(function(){
    client = new Client({
      api: 'https://ripple-rest.herokuapp.com/',
      account: gateway,
      secret: 'snQ9dAZHB3rvqcgRqjbyWHJDeVJbA'
    });
  });

  describe('building a payment', function(){
    it('should GET /payments', function() {
      request.get = sinon.spy();
      var url = 'api/v1/addresses/'+gateway+'/payments/'+recipient+'/1+XRP';

      client.buildPayment({
        amount: 1,
        currency: 'XRP',
        recipient: recipient 
      }, function(err, payment){});
      assert(request.get.calledWith(client.api + url));
    });  
  });

  describe('sending a payment', function(){
    it('should POST to /payments', function(){
      request.post = sinon.spy();
      var url = 'api/v1/addresses/'+gateway+'/payments';
      var payment = {};
      client.sendPayment(payment, function(err, payment){})
      assert(request.post.calledWith(client.api + url));
    });
  });

  describe('polling for payments', function(){
    it.skip('should GET /next_notification', function(){
      // GET api/v1/addresses/:address/next_notification
    });

    it.skip('should GET /next_notification with previous transaction hash', function(){
      // GET api/v1/addresses/:address/next_notification/:previous_transaction_hash
    });
  });

  describe('retrieving a payment', function(){
    it.skip('should get a transaction by hash', function(){
      // GET api/v1/addresses/:address/payments/:transaction_hash
    });

    it.skip('should get a raw, standard ripple transaction', function(){
      // GET api/v1/addresses/:address/txs/:transaction_hash
    });
  });

  describe('checking the server information', function(){
    it.skip('should GET /status', function(){
      // GET /api/v1/status
    });
  });


});
