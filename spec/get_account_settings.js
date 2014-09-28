const assert = require('assert');

describe('Ripple API Get Account Settings', function() {
  /* Example Response
  {

      "success": true,
      "settings": {
          "account": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "transfer_rate": "",
          "password_spent": false,
          "require_destination_tag": false,
          "require_authorization": false,
          "disallow_xrp": true,
          "disable_master": false,
          "transaction_sequence": "711",
          "email_hash": "",
          "wallet_locator": "",
          "wallet_size": "",
          "message_key": "",
          "domain": "",
          "signers": ""
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
    client.getAccountSettings({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    })
    .then(function(settings) {
      assert(settings.transaction_sequence);
      done();
    });
  });

  it('should report an invalid ripple account', function(done) {
    client.getAccountSettings({
      account: '12345'
    })
    .error(function(error) {
      assert.strictEqual(error.message, 'InvalidRippleAccount');
    });
  });

  it('should report a rippled error', function(done) {
    // Somehow disconnect from rippled
    client.getAccountSettings() 
    .error(function(error) {
      assert.strictEqual(error.message, 'RippledUnavailable');
    });
  });

  it('should report a ripple rest error', function(done) {
    // Somehow disconnect from ripple rest
    client.getAccountSettings() 
    .error(function(error) {
      assert.strictEqual(error.message, 'RippleRestUnavailable');
    });
  });
}); 

