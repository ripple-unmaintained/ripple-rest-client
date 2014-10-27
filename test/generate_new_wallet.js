const RippleRestClient = require('../');
const assert = require('assert');
const fixtures = require('./fixtures');

describe('Ripple REST Client getTrustLines', function() {
  var rippleRestClient;

  before(function () {
    rippleRestClient = new RippleRestClient({
      account: fixtures.ripple_address.source_account
    });
  });


  it('should generate a new ripple wallet with secret', function(done){

    rippleRestClient.generateNewWallet(function(error, response){
      assert(!error);
      assert(response);
      assert(response.address);
      assert(response.secret);
      done();
    });
  });

});
