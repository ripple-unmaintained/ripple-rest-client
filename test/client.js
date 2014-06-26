var Client = require('../');
var assert = require('assert');
var sinon = require('sinon');
var request = require('request');

var recipient = 'rp4u5gEskM8DtBZvonZwbu6dspgVdeAGM6';

var gateway = 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz'
var SECRET = process.env.RIPPLE_ACCOUNT_SECRET;

describe('Ripple REST Client', function(){
  before(function(){
    client = new Client({
      api: 'http://localhost:5990/',
      account: gateway,
      secret: SECRET
    });
  });

  describe('building a payment', function(){
    it('should GET /payments', function() {
      request.get = sinon.spy();
      var url = 'v1/addresses/'+gateway+'/payments/'+recipient+'/1+XRP';

      client.buildPayment({
        amount: 1,
        currency: 'XRP',
        recipient: recipient 
      }, function(err, payment){});
      assert(request.get.called);
    });  
  });

  describe('sending a payment', function(){
    it('should POST to /payments', function(){
      request.post = sinon.spy();
      var url = 'v1/addresses/'+gateway+'/payments';
      var payment = {};
      client.sendPayment(payment, function(err, payment){})
      assert(request.post.called);
    });
  });

  describe('polling for payments', function(){
    it('should GET /next_notification', function(){
      request.get = sinon.spy();
      var url = 'v1/addresses/'+gateway+'/next_notification';
      var payment = {};
      client.getNextNotification(function(err, notification){});
      assert(request.get.called);
    });

    it('should GET /next_notification with previous transaction hash', function(){
      request.get = sinon.spy();
      var url = 'v1/addresses/'+gateway+'/next_notification/somePrevi0u$transactioH@sh';
      var opts = {
        previousTransactionHash: 'somePrevi0u$transactioH@sh' 
      };
      client.getNextNotification(opts, function(err, notification){});
      assert(request.get.called);
    });
  });

  describe('retrieving a payment', function(){
    it('should GET /payments with a transaction hash', function(){
      request.post = sinon.spy();
      var url = 'v1/addresses/'+gateway+'/payments/sometr@ns@ct10nha$h';
      var payment = {
        transactionHash: 'sometr@ns@ct10nha$h'   
      };
      var spyGetPayment = sinon.spy(client, 'getPayment');

      client.getPayment(payment, function(err, payment){})
      assert(request.get.called);
    });

  });

  describe('retrieving a raw transaction', function(){
    it('should GET /txs with a transaction hash', function(){
      request.get = sinon.spy();
      var url = 'v1/addresses/'+gateway+'/txs/sometr@ns@ct10nha$h';
      var payment = {
        transactionHash: 'sometr@ns@ct10nha$h'   
      };
      client.getTransaction(payment, function(err, payment){})
      assert(request.get.calledWith(client.api + url));
    });
  });

  describe('checking the server information', function(){
    it('should GET /status', function(){
      request.get = sinon.spy();
      client.getServerStatus(function(err, payment){})
      var url = 'v1/status';
      assert(request.get.calledWith(client.api + url));
    });
  });

});
