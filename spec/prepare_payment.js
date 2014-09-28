const assert = require('assert');

describe('Ripple API Update Account Settings', function() {
  // GET http://localhost:5990/v1/accounts/rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn/payments/paths/ra5nK24KXen9AHvsdFTKHSANinZseWnPcX/1+USD+rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn?source_currencies=USD

  /* Example Response
  {

      "success": true,
      "payments": [
          {
              "source_account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
              "source_tag": "",
              "source_amount": {
                  "value": "1",
                  "currency": "USD",
                  "issuer": ""
              },
              "source_slippage": "0",
              "destination_account": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
              "destination_tag": "",
              "destination_amount": {
                  "value": "1",
                  "currency": "USD",
                  "issuer": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn"
              },
              "invoice_id": "",
              "paths": "[]",
              "partial_payment": false,
              "no_direct_ripple": false
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

  it('should list account balances', function(done) {
    client.preparePayment({
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
    client.preparePayment({
      account: '12345'
    })
    .error(function(error) {
      assert.strictEqual(error.message, 'InvalidRippleAccount');
    });
  });

  it('should report an invalid ripple account', function(done) {
    client.preparePayment({
      account: '12345'
    })
    .error(function(error) {
      assert.strictEqual(error.message, 'InvalidRippleAccount');
    });
  });

  it('should report a rippled error', function(done) {
    // Somehow disconnect from rippled
    client.preparePayment() 
    .error(function(error) {
      assert.strictEqual(error.message, 'RippledUnavailable');
    });
  });

  it('should report a ripple rest error', function(done) {
    // Somehow disconnect from ripple rest
    client.preparePayment() 
    .error(function(error) {
      assert.strictEqual(error.message, 'RippleRestUnavailable');
    });
  });
}); 

