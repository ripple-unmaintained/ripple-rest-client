var request = require('request');

var Client = function(opts) {
  this.api = opts.api;
  this.account = opts.account;
  this.secret = opts.secret || '';
  this.lastPaymentHash = opts.lastPaymentHash
}

Client.prototype.ping = function(fn){
  var url = this.api;
  request.get({ url: url, json: true }, function(err, resp, body){
    fn(err, body);
  });
};

Client.prototype.sendPayment = function(opts, fn){
  var url = this.api+'v1/accounts/'+this.account+'/payments';
  request.post(url, {form: opts, json: true }, function(err, resp, body) {
    fn(err, body);
  }) 
};

Client.prototype.getAccountBalance = function(fn){
  var url = this.api+'v1/accounts/'+this.account+'/balances';

  request.get({url: url, json: true}, function(err, resp, body){
    if(err){
      fn(err, null);
    } else {
      fn(null, body);
    }
  });
};

Client.prototype.buildPayment = function(opts, fn){
  var amount = opts.amount + "+" + opts.currency;
  if (opts.issuer) {
    amount += ("+"+ opts.issuer);
  }
  var url = this.api+'v1/accounts/'+this.account+'/payments/paths/'+opts.recipient+'/'+amount; 
  request.get({ url: url, json: true }, function(err, resp, body){
    fn(err, body);
  });  
};

Client.prototype.getNotification = function(hash, fn){
  var url = this.api+'v1/accounts/'+this.account+'/notifications/'+hash+"?types=payment";
  request.get(url, { json: true },function(err, resp, body){
    if (err) {
      fn(err, null);
    } else {
      var notification = body.notification;
      if (notification && notification.next_notification_url) {
        var id = notification.next_notification_url.split('notifications/')[1].split('?')[0]; 
        body.notification.next_notification_hash = id;
        fn(null, body.notification);
      } else {
        fn('no notification', null);
      }
    }
  });  
};

Client.prototype.setHash = function(paymentHash, fn) {
  this.lastPaymentHash = paymentHash; 
}

Client.prototype.getPayment = function(hash, fn){
  var url = this.api+'v1/accounts/'+this.account+'/payments/'+hash;
  request.get(url, { json: true }, function(err, resp, body) {
    if (err) {
      fn(err, null);
    } else {
      fn(null, body.payment);
    }
  }) 
};

Client.prototype.getTransaction = function(opts, fn){
  var url = this.api+'v1/addresses/'+this.account+'/txs/'+opts.transactionHash;
  request.get(url, {form: opts, json: true }, function(err, resp, body) {
    fn(err, body);
  }) 
};

Client.prototype.getServerStatus = function(opts, fn){
  var url = this.api+'v1/status';
  request.get(url, {form: opts, json: true }, function(err, resp, body) {
    fn(err, body);
  }) 
};

Client.prototype.newPayment = function(opts, fn) {
  var amount = opts.amount.toString() + opts.currency + opts.issuer;
  var url = this.api+'v1/accounts/'+this.account+'/payments/paths/'+opts.destination_account+'/'+amount
  request.get(url, {form: opts, json: true }, function(err, resp, body) {
    fn(err, body);
  }) 
};

Client.prototype.updateAccountSettings = function(opts, fn) {
  var url = this.api + 'v1/accounts/'+opts.account+'/settings';
  request.post(url, {form: opts.data, json: true}, function(err, resp, body){
    fn(err, body);
  });
};

Client.prototype.confirmPayment = function(hash, fn) {
  var client = this;
  function poll(hash, callback){
    client.getPayment(hash, function(err, payment){
      if(err) {
        fn(err, null);
        return;
      } else {
        if(payment){
          fn(null, payment);
        } else {
          setTimeout(function(){
            poll(hash, poll);
          }, 1000);
        };
      };
    });
  };
  poll();
};

module.exports = Client;
