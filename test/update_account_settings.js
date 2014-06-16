var Client = require('../');
var assert = require('assert');
var sinon = require('sinon');
var request = require('request');

var recipient = 'rp4u5gEskM8DtBZvonZwbu6dspgVdeAGM6';
var gateway = 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz';

describe('updating account settings', function() {
  before(function(){
    client = new Client({
      api: 'http://localhost:5990/',
      account: gateway,
      secret: 'sp1RTbeq9djvXFyGfmS2v3XMKcgVa'
    });
  });

  it('should set require destination tag', function(done) {

    var optsHotWallet = {
      account: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz',
      data: {
        secret: '<secret>',
        settings: {
          disallow_xrp: false,
          require_destination_tag: false
        }
      }
    };

    client.updateAccountSettings(optsHotWallet, function(err, settings) {
      console.log(err, settings);
      assert(!err);
      assert(settings);
      done();
    });
  })
});
