var Client = require('./lib/client').Client;

describe('Ripple REST Client', function(){
  it('should require a url to the REST server', function(done){
    var client = new Client({
      api: 'http://localhost:5990',
      account: 'rPFhAYx7wCoRziNdjSnCbHw6iszhFA9cnR',
      secret: 'sap1BJFJRJz7Rs9skzPZ7DV13c3xu'
    });
  });

  it('should send a payment', function(done){
    client.sendPayment({
      recipient: '',
      amount: '',
      currency: '',
      issuer: ''
    }, function(err, payment){

    });
  });

  it('should listen for payments', function(done){

  });
});
