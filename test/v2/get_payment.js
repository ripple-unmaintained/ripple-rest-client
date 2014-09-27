const Client = require(__dirname+'/../../');
const assert = require('assert');

const client = new Client({
  account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
  version: 2
})

const PAYMENT_HASH='6D1AF597FCE3629297AC7A6D14EEC3D68CE9DDA0DD363455A432C781442E27A0';
const TRUSTSET_HASH='34D7A8B40A8676AD5819C311C733B64CF97FDEF51095358288233A98E3FD6968';

describe('Getting a single payment', function() {
  it('should return the formatted payment object', function(done) {
    client.getPayment(PAYMENT_HASH)
    .then(function(payment) {
      console.log(payment);
      assert.strictEqual(payment.destination_account, 'r4tFZoa7Dk5nbEEaCeKQcY3rS5jGzkbn8a')
      done();
    })
    .error(function(error){
      throw new Error(error);
    });
  });

  it.skip('should return an error with unknown payment hash', function(done) {
    client.getPayment('12345')
    .catch(Client.InvalidPaymentHash, function(error) {
      assert(error instanceof Error);
      done();
    });
  });

  it.skip('should error if the transaction is not a payment', function(done) {
    client.getPayment(TRUSTSET_HASH)
    .catch(Client.TransactionNotPayment, function(error) {
      assert(error instanceof Error);
      done();
    });
  });

  describe('When Ripple REST is disconnected', function() {
    before(function(next) {
      // somehow disconnect ripple rest right here
      next();
    });

    it.skip('should return an error with no connection to ripple rest', function(done) {
      client.getPayment(PAYMENT_HASH)
      .catch(Client.RippleRestConnectionError, function(error) {
        assert(error instanceof Error); 
        done();
      });
    });
  });
});

