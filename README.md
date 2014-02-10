## Ripple REST Node.js Client Library

The Ripple REST Api Server software simplifies interaction with the Ripple payment network. This libraryaims to provide the most simplified service for using the REST api in node.js.

### Installation

    npm install ripple-rest-client

#### Usage
    
    var RippleRestClient = require("ripple-rest-client").Client;
    
    var client = new RippleRestClient({
      api: 'http://localhost:5990',
      account: 'rw6qnMHxqg1m3xki7Y89H45BjU7LnAYyoL',
      secret: 'shgL7M1kbgrBkkkQwwRGHBmbLamxe' 
    });

There are two primary payemnt functions, sending payments and listening to incoming payments.

Sending a Payment:

    client.sendPayment({
      recipient: 'rfZqa3caUggfV2p1K19HHMnQbJcAposMNc',
      amount: 10,
      currency: 'XAG',
      issuer: 'rNipPmQdFMm8SwtsqjjiupRHo8KBwQrDbk' 
    }, function(err, response){
      console.log('payment submitted');
      console.log(response);
    });

Listening for Payments:

    client.monitor.on('payment:incoming', function(payment){
      console.log('an incoming payment', payment);
    });

