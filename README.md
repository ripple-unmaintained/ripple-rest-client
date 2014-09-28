## Ripple REST Node.js Client Library

[![Build Status](https://api.travis-ci.org/stevenzeiler/ripple-rest-client.png)](https://api.travis-ci.org/stevenzeiler/ripple-rest-client)

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

#### Proposed API actions

http://dev.ripple.com/rest-api-tool.html#get-payment-history

The following API methods return an instance of Promise

Generate Account

    ripple.generateAccount()

Get Account Balances

    ripple.getAccountBalances({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    })

Get Account Settings

    ripple.getAccountSettings({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    })

Update Account Settings

    ripple.updateAccountSettings({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
      require_destination_tag: false,
      require_authorization: false,
      disallow_xrp: true,
      disable_master: false,
      email_hash: "98b4375e1d753e5b91627516f6d70977"
      secret: 'sssssssssssssssssssssss'
    }) 

Prepare Payment

  ripple.preparePayment({
    account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
    destination: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
    amount: 10,
    currency: 'BTC',
    issuer: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
    source_currencies: ['USD']
  })

Submit Payment

Confirm Payment

Get Payment History

Get Trustlines

    ripple.getTrustlines({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      counterparty: 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q'
      currency: 'USD'
    })

Grant Trustline

Check Notifications

    ripple.checkNotifications({
      account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      hash: 'A7C3B03663C205C84C7A91730A3E7874A88969B50D80471D8E62BFC04D2EA07A'
    })

Retrive Ripple Transaction

    ripple.retriveRippleTransaction({
      hash: 'A7C3B03663C205C84C7A91730A3E7874A88969B50D80471D8E62BFC04D2EA07A'
    })

Generatue UUID

    ripple.generateUUID()
