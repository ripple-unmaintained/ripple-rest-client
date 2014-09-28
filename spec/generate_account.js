const assert = require('assert');

describe('Ripple API Generate Account', function() {

  before(function() {
    client = new RippleAPI({
      backend: 'rest',
      url: 'http://127.0.0.1:5990'
    });
  });

  it('should generate a random account', function(done) {
    client.generateAccount()
    .then(function(account) {
      assert(account.address);
      assert(account.secret);
      done();
    });
  });

  it('should report a ripple rest error', function(done) {
    client.generateAccount() 
    .error(function(error) {
      assert.strictEqual(error.message, 'RippleRestUnavailable');
    });
  });
}); 

