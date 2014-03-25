var request = require('request');

var Client = function(opts) {
  this.api = opts.api;
  this.account = opts.account;
  this.secret = opts.secret || '';
  this.lastPaymentHash = opts.lastPaymentHash
}

Client.prototype.sendPayment = function(opts, fn){
  var url = this.api+'v1/addresses/'+this.account+'/payments';
  request.post(url, {form: opts, json: true }, function(err, resp, body) {
    fn(err, body);
  }) 
};


Client.prototype.buildPayment = function(opts, fn){
  var amount = opts.amount + "+" + opts.currency;
  if (opts.issuer) {
    amount += ("+"+ opts.issuer);
  }
  var url = this.api+'v1/addresses/'+this.account+'/payments/'+opts.recipient+'/'+amount; 
  request.get(url, function(err, resp, body){
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
}

Client.prototype.listen = function(opts){
  /* 
    1. Get the original next notification
    2. Begin checking the next notification url
    3. If transaction hash is not lastTransactionHash, emit event
  */

  // GET /v1/addresses/rNw4ozCG514KEjPs5cDrqEcdsi31Jtfm5r/next_notification
};

module.exports = Client;
