const assert = require('assert');

describe('Ripple API Get Account Balances', function() {

  before(function() {
    client = new RippleAPI({
      backend: 'rest',
      url: 'http://127.0.0.1:5990'
    });
  });

  it('should list account balances', function(done) {
    client.getAccountBalances({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    })
    .then(function(balances) {
      assert(balances[0].value);
      assert(balances[0].currency);
      assert(balances[0].counterparty);
      done();
    });
  });

  it('should report an invalid ripple account', function(done) {
    client.getAccountBalances({
      account: '12345'
    })
    .error(function(error) {
      assert.strictEqual(error.message, 'InvalidRippleAccount');
    });
  });

  it('should report a ripple rest error', function(done) {
    client.getAccountBalances() 
    .error(function(error) {
      assert.strictEqual(error.message, 'RippleRestUnavailable');
    });
  });
}); 

