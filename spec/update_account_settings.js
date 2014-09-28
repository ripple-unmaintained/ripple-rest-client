const assert = require('assert');

describe('Ripple API Update Account Settings', function() {
  // POST https://api.ripple.com/v1/accounts/r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk/settings
  /* Example Request
  {
    "secret": "sssssssssssssssssssssssssssss",
    "settings": {
      "require_destination_tag": false,
      "require_authorization": false,
      "disallow_xrp": false,
      "disable_master": false,
      "email_hash": "98b4375e1d753e5b91627516f6d70977"
    }
  }
  */
  before(function() {
    client = new RippleAPI({
      backend: 'rest',
      url: 'http://127.0.0.1:5990'
    });
  });

  it('should list account balances', function(done) {
    client.updateAccountSettings({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
      require_destination_tag: false,
      require_authorization: false,
      disallow_xrp: true,
      disable_master: false,
      email_hash: "98b4375e1d753e5b91627516f6d70977"
    })
    .then(function(settings) {
      assert(!settings.disallow_xrp);
      assert(!settings.require_Destination_tag);
      assert.strictEqual(settings.email_hash, '98b4375e1d753e5b91627516f6d70977');
      done();
    });
  });

  it('should report an invalid ripple account', function(done) {
    client.updateAccountSettings({
      account: '12345'
    })
    .error(function(error) {
      assert.strictEqual(error.message, 'InvalidRippleAccount');
    });
  });

  it('should report a rippled error', function(done) {
    // Somehow disconnect from rippled
    client.updateAccountSettings() 
    .error(function(error) {
      assert.strictEqual(error.message, 'RippledUnavailable');
    });
  });

  it('should report a ripple rest error', function(done) {
    // Somehow disconnect from ripple rest
    client.updateAccountSettings() 
    .error(function(error) {
      assert.strictEqual(error.message, 'RippleRestUnavailable');
    });
  });
}); 

