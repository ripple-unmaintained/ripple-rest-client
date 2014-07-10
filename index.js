var request = require('request');

var Client = function(opts) {
  this.api = opts.api || 'http://localhost:5990/';
  this.account = opts.account;
  this.secret = opts.secret || '';
  this.lastPaymentHash = opts.lastPaymentHash
}

Client.prototype.ping = function(fn){
  var url = this.api;
  request.get({ url: url, json: true }, function(error, resp, body){
    fn(error, body);
  });
};

Client.prototype.sendPayment = function(opts, fn){

  var options = {
    url: this.api+'v1/payments',
    json: opts
  };

  request.post(options, function(error, resp, body) {
    fn(error, body);
  });
};

Client.prototype.getAccountBalance = function(fn){
  var url = this.api+'v1/accounts/'+this.account+'/balances';

  request.get({url: url, json: true}, function(error, resp, body){
    if(error){
      fn(error, null);
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
  request.get({ url: url, json: true }, function(error, resp, body){
    fn(error, body);
  });
};

Client.prototype.getNotification = function(hash, fn){
  var url = this.api+'v1/accounts/'+this.account+'/notifications/'+hash+"?types=payment";
  request.get(url, { json: true },function(error, resp, body){
    if (error) {
      fn(error, null);
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

Client.prototype.getNextNotification = function(hash, fn) {
  var self = this;
  self.getNotification(hash, function(error, notification) {
    if (error) {
      return fn(error, null);
    }
    if (notification.next_notification_hash) {
      self.getNotification(hash, fn);
    } else {
      fn(null, null);  
    }
  });
}

Client.prototype.setHash = function(paymentHash, fn) {
  this.lastPaymentHash = paymentHash; 
}

Client.prototype.getPayment = function(hash, fn){
  var url = this.api+'v1/accounts/'+this.account+'/payments/'+hash;
  request.get(url, { json: true }, function(error, resp, body) {
    if (error) {
      fn(error, null);
    } else {
      fn(null, body.payment);
    }
  }) 
};

Client.prototype.getPayments = function(fn){
  var url = this.api+'v1/accounts/'+this.account+'/payments';
  request.get(url, { json: true }, function(error, resp, body) {
    if (error) {
      fn(error, null);
    } else if (!body.success) {
      fn(body.error, null);
    } else {
      fn(null, body.payments);
    }
  });
};

Client.prototype.getTransaction = function(opts, fn){
  var url = this.api+'v1/addresses/'+this.account+'/txs/'+opts.transactionHash;
  request.get(url, {form: opts, json: true }, function(error, resp, body) {
    fn(error, body);
  }) 
};

Client.prototype.getServerStatus = function(opts, fn){
  var url = this.api+'v1/status';
  request.get(url, {form: opts, json: true }, function(error, resp, body) {
    fn(error, body);
  });
};

Client.prototype.newPayment = function(opts, fn) {
  var amount = opts.amount.toString() + opts.currency + opts.issuer;
  var url = this.api+'v1/accounts/'+this.account+'/payments/paths/'+opts.destination_account+'/'+amount;
  request.get(url, {form: opts, json: true }, function(error, resp, body) {
    fn(error, body);
  }) 
};

Client.prototype.updateAccountSettings = function(opts, fn) {
  
  var account = opts.account || this.account;
  opts.data.secret = opts.data.secret || this.secret;

  var options = {
    url: this.api + 'v1/accounts/'+account+'/settings',
    json: opts.data
  };

  request.post(options, function(error, resp, body){
    fn(error, body);
  });
};

Client.prototype.confirmPayment = function(hash, fn) {
  var client = this;
  function poll(hash, callback){
    client.getPayment(hash, function(error, payment){
      if(error) {
        fn(error, null);
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

Client.prototype.getPaymentStatus = function(statusUrl, callback){
  request.get({url: statusUrl, json: true}, function(error, resp, body){
    if (error) {
      callback(error, null);
    } else {
      callback(null, body.payment);
    }

  });
};

Client.prototype._getAndHandlePaymentStatus = function(statusUrl, callback, loopFunction){
  var self = this;

  self.getPaymentStatus(statusUrl, function(error, response){

    if(error){
      callback(error, null);
      return loopFunction(statusUrl, callback, loopFunction);
    }

    if (response.state === 'validated'){
      callback(null, response);
    } else {
      loopFunction(statusUrl, callback, loopFunction);
    }

  });
};

Client.prototype.pollPaymentStatus = function(paymentUrl, callback){
  var self = this;
  self._getAndHandlePaymentStatus(paymentUrl, callback, self._getAndHandlePaymentStatus.bind(this));
};

Client.prototype.getTrustLines = function(opts, callback){
  var account = opts.fromAccount || this.account;
  var url = this.api + 'v1/accounts/'+account+'/trustlines';

  if (opts.toAccount) {
    url += '?toAccount=' + opts.toAccount;
  }

  if (opts.toAccount && opts.currency) {
    url += '&currency='+opts.currency;
  }

  var options = {
    url: url,
    json: true
  };

  request.get(options, function(error, resp, body){
    callback(error, body.trustlines);
  });
};

Client.prototype.setTrustLines = function(options, callback){
  var account = options.account || this.account;
  
  var options = {
    url: this.api + 'v1/accounts/'+account+'/trustlines',
    json: {
      secret: options.secret,
      trustline: {
        limit: options.amount,
        currency: options.currency,
        counterparty: options.issuer
      }
    }
  };

  request.post(options, function(error, resp, body) {
    callback(error, body.trustline);
  });

};

module.exports = Client;
