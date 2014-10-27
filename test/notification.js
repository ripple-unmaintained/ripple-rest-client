const RippleRestClient = require('../');
const assert = require('assert');
const fixtures = require('./fixtures');

describe('Ripple REST Client get payment notification', function() {
  var rippleRestClient;
  var payment_hashes = {};

  before(function (done) {
    this.timeout(3000);
    rippleRestClient = new RippleRestClient({
      account: fixtures.ripple_address.source_account
    });

    rippleRestClient.getPayments(null, function(error, payments){
      payment_hashes.latest_hash = payments[0].payment.hash;
      payment_hashes.previous_hash = payments[1].payment.hash;
      done();
    });
    

  });

  it('should should get NO notification', function(done){
    this.timeout(8000);
    rippleRestClient.getNotification(payment_hashes.latest_hash, function(error, response){
      assert(!response);
      assert(!error);
      done();
    });
  });

  it('should should get a notification', function(done){
    this.timeout(5000);
    rippleRestClient.getNotification(payment_hashes.previous_hash, function(error, response){
      assert(response);
      assert(response.hash);
      assert.strictEqual(response.next_hash, payment_hashes.latest_hash);
      done();
    });
  });

});
