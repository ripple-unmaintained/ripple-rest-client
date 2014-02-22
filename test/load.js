var async = require('async');
var Client = require('../lib/client');

describe('making tons of payments', function(){
  before(function(){
    client = new Client({
      api: 'https://ripple-rest.herokuapp.com/',
      account: 'rJMNfiJTwXHcMdB4SpxMgL3mvV4xUVHDnd',
      secret: 'snQ9dAZHB3rvqcgRqjbyWHJDeVJbA'
    });
  });

  it("should submit one thousand payments", function(fn){
    var callbacks = 0;
    function callback(err, payment){
      console.log(err);
      console.log(payment);
      callbacks += 1;
    }
 
    var opts = {
      recipient: 'rp4u5gEskM8DtBZvonZwbu6dspgVdeAGM6',
      amount: 0.01,
      currency: 'SGZ',
      issuer: 'rJMNfiJTwXHcMdB4SpxMgL3mvV4xUVHDnd'
    };

    while (true) {
      if (callbacks < 1000) {
        client.send_payment(opts, callback);
      } else {
        fn();
      }
    }
  });

});
