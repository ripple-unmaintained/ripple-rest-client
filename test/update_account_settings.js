const RippleRestClient = require('../');
const assert = require('assert');
const fixtures = require('./fixtures');

describe('updating account settings', function() {
  before(function () {
    this.timeout(3000);
    rippleRestClient = new RippleRestClient({
      account: fixtures.ripple_address.source_account
    });
  });

  it('should set require destination tag', function(done) {

    var optsHotWallet = {
      account: fixtures.ripple_address.source_account,
      data: {
        secret: fixtures.ripple_address.source_account_secret,
        settings: {
          require_destination_tag: false,
          disallow_xrp: false
        }
      }
    };

    rippleRestClient.updateAccountSettings(optsHotWallet, function(error, settings) {
      assert(!error);
      assert(settings.success);
      assert(settings.hash);
      assert.strictEqual(optsHotWallet.data.settings.require_destination_tag, settings.settings.require_destination_tag);
      assert.strictEqual(optsHotWallet.data.settings.disallow_xrp, settings.settings.disallow_xrp);
      done();
    });
  });

});
