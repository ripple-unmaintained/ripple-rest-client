const assert = require('assert');

describe('Ripple API Get Account Trust Lines', function() {
  
  /* Example Response
  {

    "success": true,
    "trustlines": [
        {
            "account": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
            "counterparty": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q",
            "currency": "USD",
            "limit": "2001",
            "reciprocated_limit": "0",
            "account_allows_rippling": false,
            "counterparty_allows_rippling": true
        }
    ]

  }
  */

  before(function() {
    client = new RippleAPI({
      backend: 'rest',
      url: 'http://127.0.0.1:5990'
    });
  });

  it('should list trust lines', function(done) {
    client.getTrustlines({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      counterparty: 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q'
      currency: 'USD'
    })
    .then(function(notification) {
      assert(notification.previous_hash);
      assert(notification.next_hash);
      assert(notification.previous_notification_url);
      assert(notification.next_notification_url);
      done();
    });
  });

  it('should report an invalid counterparty ripple account', function(done) {
    client.getTrustlines({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      counterparty: 'asdlkjer3'
    })
    .error(function(error) {
      assert.strictEqual(error.message, 'InvalidCounterpartyRippleAccount');
    });
  });

  it('should report an invalid ripple account', function(done) {
    client.getTrustlines({
      account: '12345'
    })
    .error(function(error) {
      assert.strictEqual(error.message, 'InvalidRippleAccount');
    });
  });

  it('should report a ripple rest error', function(done) {
    client.getTrustlines() 
    .error(function(error) {
      assert.strictEqual(error.message, 'RippleRestUnavailable');
    });
  });
}); 

