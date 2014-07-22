var request = require('request');
var async = require('async');
var uuid = require('node-uuid');

var Client = function(opts) {
  this.api = opts.api || 'http://localhost:5990/';
  this.account = opts.account;
  this.secret = opts.secret || '';
  this.lastPaymentHash = opts.lastPaymentHash;
  this.errors = [];
}

Client.prototype.ping = function(callback){
  var url = this.api;
  request.get({ url: url, json: true }, function(error, resp, body){
    callback(error, body);
  });
};

Client.prototype.sendPayment = function(opts, callback){

  if (this.secret != '') {
    opts.secret = this.secret;
    opts.client_resource_id = uuid.v4();
  }

  var options = {
    url: this.api+'v1/payments',
    json: opts
  };

  request.post(options, function(error, resp, body) {
    if (error) {
      return callback(error, null);
    }

    if (body.success) {
      callback(null, body);
    } else {
      callback(body.message, null);
    }
  });
};

Client.prototype.getAccountBalance = function(callback){
  var url = this.api+'v1/accounts/'+this.account+'/balances';

  request.get({url: url, json: true}, function(error, resp, body){
    if(error){
      callback(error, null);
    } else {
      callback(null, body);
    }
  });
};

Client.prototype.buildPayment = function(opts, callback){

  var amount = opts.amount + "+" + opts.currency;
  if (opts.issuer) {
    amount += ("+"+ opts.issuer);
  }
  var url = this.api+'v1/accounts/'+this.account+'/payments/paths/'+opts.recipient+'/'+amount;
  request.get({ url: url, json: true }, function(error, resp, body){
    callback(error, body);
  });
};

Client.prototype.getNotification = function(hash, callback){
  var url = this.api+'v1/accounts/'+this.account+'/notifications/'+hash+"?types=payment";
  request.get(url, { json: true },function(error, resp, body){
    if (error) {
      callback(error, null);
    } else {
      var notification = body.notification;
      if (notification && notification.next_notification_url) {
        var id = notification.next_notification_url.split('notifications/')[1].split('?')[0];
        body.notification.next_notification_hash = id;
        callback(null, body.notification);
      } else {
        callback(null, 'no notification');
      }
    }
  });
};

Client.prototype.getNextNotification = function(hash, callback) {
  var self = this;
  self.getNotification(hash, function(error, notification) {
    if (error) {
      return callback(error, null);
    }
    if (notification.next_notification_hash) {
      self.getNotification(hash, callback);
    } else {
      callback(null, null);
    }
  });
}

Client.prototype.setHash = function(paymentHash, callback) {
  this.lastPaymentHash = paymentHash;
};

Client.prototype.getPayment = function(hash, callback){
  var url = this.api+'v1/accounts/'+this.account+'/payments/'+hash;
  request.get(url, { json: true }, function(error, resp, body) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, body.payment);
    }
  })
};

Client.prototype.getTransaction = function(opts, callback){
  var url = this.api+'v1/addresses/'+this.account+'/txs/'+opts.transactionHash;
  request.get(url, {form: opts, json: true }, function(error, resp, body) {
    callback(error, body);
  })
};

Client.prototype.getServerStatus = function(opts, callback){
  var url = this.api+'v1/status';
  request.get(url, {form: opts, json: true }, function(error, resp, body) {
    callback(error, body);
  });
};

Client.prototype.newPayment = function(opts, callback) {
  var amount = opts.amount.toString() + opts.currency + opts.issuer;
  var url = this.api+'v1/accounts/'+this.account+'/payments/paths/'+opts.destination_account+'/'+amount;
  request.get(url, {form: opts, json: true }, function(error, resp, body) {
    callback(error, body);
  })
};

Client.prototype.updateAccountSettings = function(opts, callback) {

  var account = opts.account || this.account;
  opts.data.secret = opts.data.secret || this.secret;

  var options = {
    url: this.api + 'v1/accounts/'+account+'/settings',
    json: opts.data
  };

  request.post(options, function(error, resp, body){
    callback(error, body);
  });
};

Client.prototype.confirmPayment = function(hash, callback) {
  var client = this;
  function poll(hash, callback){
    client.getPayment(hash, function(error, payment){
      if(error) {
        callback(error, null);
        return;
      } else {
        if(payment){
          callback(null, payment);
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
  self.getPaymentStatus(statusUrl.status_url, function(error, response){
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

Client.prototype.setTrustLines = function(options, callback){
  var account = options.account || this.account;
  var options = {
    url: this.api + 'v1/accounts/'+account+'/trustlines',
    json: {
      secret: options.secret,
      trustline: {
        limit: options.limit,
        currency: options.currency,
        counterparty: options.counterparty
      }
    }
  };

  request.post(options, function(error, resp, body) {
    callback(error, body.trustline);
  })

};

Client.prototype.getTrustLines = function(options, callback){

  var account = options.fromAccount || this.account;
  var url = this.api + 'v1/accounts/'+account+'/trustlines';

  if (options.toAccount) {
    url += '?counterparty=' + options.toAccount;
  }

  if (options.toAccount && options.currency) {
    url += '&currency='+options.currency;
  }

  var settings = {
    url: url,
    json: true
  };

  request.get(settings, function(error, resp, body){
    callback(error, body.trustlines);
  });
};

Client.prototype.sendAndConfirmPayment = function(opts, callback){
  var self = this;
  async.waterfall([
    function(next){
      self.sendPayment(opts, next);
    },
    function(payment, next){
      self.pollPaymentStatus(payment, next);
    },
  ], callback);
};

Client.prototype._handleError = function(error, callback){
  this.errors.push({ field: 'ripple_rest_client', message: error });
  callback(error, null);
};

module.exports = Client;
