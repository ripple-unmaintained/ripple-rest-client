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


  it('should get trust lines of accounts', function(done){

    rippleRestClient.getTrustLines(rippleRestClient.account, function(error, response){
      assert(response);
      assert(response instanceof Array);
      done();
    });
  });

});
