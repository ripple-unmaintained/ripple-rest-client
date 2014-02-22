var Client = require('../lib/client');
var assert = require('assert');

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

  it('should send a payment', function(fn){
    client.send_payment({
      recipient: recipient,
      amount: '0.01',
      currency: 'SGZ',
      issuer: gateway
    }, function(err, payment){
      console.log(err);
      console.log(payment);
      assert(!err);
      assert(payment);
      fn();
    });
  });

  it("should get the next notification without a transaction hash", function(fn){
    client.get_next_notification(function(err, notification){
      assert(!err);
      assert(notification);
      fn();
    });
  });

  it("should get the next notification with a transaction hash", function(fn){
    opts = { previous_transaction_hash: 'hash' }
    client.get_next_notification(opts, function(err, notification){
      assert(!err);
      assert(notification);
      fn();
    });
  });

  it('should get a new payment', function(fn){
    opts = { 
      amount: '10/XAG/issuer',
      address: 'rippleAddress'
    };
    client.get_payment_options(opts, function(err, payment_options) {
      assert(!err);    
      assert(payment_options);
      fn();
    });
  });

  it('should get a single persisted payment', function(fn){
    opts = { transaction_hash: 'transactionHash' };
    client.get_payment(opts, function(err, payment){
      assert(!err);    
      assert(payment_options);
      fn();
    });
  });

  it('should get the server status info', function(fn){
    client.get_server_status(function(err, status){
      assert(!err);
      assert(status);
      fn();
    });
  });

  it('should get a standard ripple transaction', function(fn){
    opts = { transaction_hash: 'hash' };
    client.get_transaction(opts, function(err, transaction){
      assert(!err);
      assert(transaction);
      fn();
    });
  });
});
