const assert = require('assert');

describe('Ripple API Get Account Balances', function() {

  before(function() {
    client = new RippleAPI({
      backend: 'rest',
      url: 'http://127.0.0.1:5990'
    });
  });

  it('should list account balances', function(done) {
    client.checkNotifications({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      hash: 'A7C3B03663C205C84C7A91730A3E7874A88969B50D80471D8E62BFC04D2EA07A'
    })
    .then(function(notification) {
      assert(notification.previous_hash);
      assert(notification.next_hash);
      assert(notification.previous_notification_url);
      assert(notification.next_notification_url);
      done();
    });
  });

  it('should report an invalid ripple transaction hash', function(done) {
    client.checkNotifications({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      hash: 'asdlkjer3'
    })
    .error(function(error) {
      assert.strictEqual(error.message, 'InvalidRippleTransactionHash');
    });
  });

  it('should report an invalid ripple account', function(done) {
    client.checkNotifications({
      account: '12345'
    })
    .error(function(error) {
      assert.strictEqual(error.message, 'InvalidRippleAccount');
    });
  });

  it('should report a ripple rest error', function(done) {
    client.checkNotifications() 
    .error(function(error) {
      assert.strictEqual(error.message, 'RippleRestUnavailable');
    });
  });
}); 

