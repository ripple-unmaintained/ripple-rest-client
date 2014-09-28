const assert = require('assert');

describe('Ripple API Confirm Payment', function() {

  before(function() {
    client = new RippleAPI({
      backend: 'rest',
      url: 'http://127.0.0.1:5990'
    });
  });

  it('should confirm a ripple payment', function(done) {
    client.confirmPayment({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      hash: 'A7C3B03663C205C84C7A91730A3E7874A88969B50D80471D8E62BFC04D2EA07A'
    })
    .then(function(payment) {
      assert.strictEqual(payment.destination_account, 'rEKuBLEX2nHUiGB9dCGPnFkA7xMyafHTjP');
      assert.strictEqual(payment.result, 'tesSUCCESS');
      done();
    });
  });

  it('should report an invalid ripple transaction hash', function(done) {
    client.confirmPayment({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      hash: 'asdlkjer3'
    })
    .error(function(error) {
      assert.strictEqual(error.message, 'InvalidRippleTransactionHash');
    });
  });

  it('should report an invalid ripple account', function(done) {
    client.confirmPayment({
      account: '12345'
    })
    .error(function(error) {
      assert.strictEqual(error.message, 'InvalidRippleAccount');
    });
  });

  it('should report a ripple rest error', function(done) {
    client.confirmPayment() 
    .error(function(error) {
      assert.strictEqual(error.message, 'RippleRestUnavailable');
    });
  });
}); 

