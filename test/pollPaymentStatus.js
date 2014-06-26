var Client = require('../');
var assert = require('assert');
var request = require('request');
var sinon = require('sinon');

describe('Ripple REST Client poll payment status', function(){
  var client;

  before(function(){
    client = new Client({
      api: 'http://localhost:5990/',
      account: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr'
    });
  });

  var uuid = '96d70580-1e97-4da6-954f-57c527be706d';

  it('\nshould respond with success == true', function(done){
    var paymentUrl = client.api+'v1/accounts/'+client.account+'/payments/'+uuid;

    client.getPaymentStatus(paymentUrl, function(error, response){
      assert(typeof response === 'object');
      done();
    });
  });

  it('\nshould respond with payment state of validated ', function(done){

    var paymentUrl = client.api+'v1/accounts/'+client.account+'/payments/'+uuid;

    client.getPaymentStatus(paymentUrl, function(error, response){
        assert.strictEqual(response.state, 'validated');
        done();

    });
  });

  it('\nrequest should fail because of a wrong parameter', function(done){
    var paymentUrl = client.api+'v1/accounts/'+client.account+'/payments/506be911-bff0-49ad-9be0-7fcc9562e9e';
    client.getPaymentStatus(paymentUrl, function(error, response){
        assert(!response);
        done();

    });
  });

  it('\nshould call getPaymentStatus', function(done){
    var paymentUrl = client.api+'v1/accounts/'+client.account+'/payments/'+uuid;
    var spyGetPaymentStatus = sinon.spy(client, 'getPaymentStatus');
    client.pollPaymentStatus(paymentUrl, function(error, status) {
      assert(spyGetPaymentStatus.called);
      assert(spyGetPaymentStatus.withArgs(paymentUrl).called);
      done();
    });
  });

});
