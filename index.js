const async = require('async');
const uuid = require('node-uuid');
const RippleRestV1 = require(__dirname+'/lib/clients/rest_v1.js');
const http = require('superagent');

var Client = function(options) {
  this.api = options.api || 'http://localhost:5990/';
  this.account = options.account;
  this.secret = options.secret || '';
  this.lastPaymentHash = options.lastPaymentHash;
  this.errors = [];
  this.version = options.version || 1;
}

Client.prototype.ping = function(callback){
  var url = this.api;
  http
    .get(url)
    .end(function(error, response){
      if (error) {
        callback(error);
      } else {
        callback(null, response.body);
      }
  });
};

Client.prototype.generateUUID = function(callback) {
  var url = this.api+'v1/uuid';

  http
    .get(url)
    .end(function(error, response){
      if (error) {
        return callback(error);
      }

      if (response.body.success) {
        callback(null, response.body.uuid);
      } else {
        callback(response.body);
      }
    });
};

Client.prototype.generateNewWallet = function(callback) {
  var url = this.api+'v1/wallet/new';

  http
    .get(url)
    .end(function(error, response){
      if (error) {
        return callback(error);
      }

      if (response.body.success) {
        callback(null, response.body.wallet);
      } else {
        callback(response.body);
      }
    });
};

Client.prototype.sendPayment = function(payment, callback){
  var payment = payment;
  var url = this.api+'v1/accounts/'+this.account+'/payments';

  if (this.secret !== '') {
    payment.secret = this.secret;
    payment.client_resource_id = uuid.v4();
  }

  http
    .post(url)
    .send(payment)
    .end(function(error, response) {

      if (error) {
        return callback(error);
      }

      if (response.body.success) {
        callback(null, response.body);
      } else {
        callback(response.body);
      }
    });
};

Client.prototype.getAccountBalance = function(callback){
  var url = this.api+'v1/accounts/'+this.account+'/balances';

  http
    .get(url)
    .end(function(error, response){
      if (error) {
        return callback(error);
      }

      if (response.body.success) {
        callback(null, response.body);
      } else {
        callback(response.body);
      }
  });
};

Client.prototype.buildPayment = function(opts, callback){

  var amount = opts.amount + "+" + opts.currency;
  if (opts.issuer) {
    amount += ("+"+ opts.issuer);
  }
  var url = this.api+'v1/accounts/'+this.account+'/payments/paths/'+opts.recipient+'/'+amount;
  http
    .get(url)
    .end(function(error, response){

      if (error) {
        return callback(error);
      }

      if (response.body.success) {
        callback(null, response.body);
      } else {
        callback(response.body);
      }

    });
};

Client.prototype.getNotification = function(hash, callback){
  var url = this.api+'v1/accounts/'+this.account+'/notifications/'+hash+"?types=payment";

  http
    .get(url)
    .end(function(error, response){

    if (error) {
      callback(error);
    } else {
      var notification = response.body.notification;

      if (notification && notification.next_hash) {
        notification.next_notification_hash = notification.next_hash;
        callback(null, notification);
      } else {
        callback(null, null);
      }
    }
  });
};

Client.prototype.setHash = function(paymentHash, callback) {
  this.lastPaymentHash = paymentHash;
};

Client.prototype.getPayment = function(hash, callback){
  var url = this.api+'v1/accounts/'+this.account+'/payments/'+hash;

  http
    .get(url)
    .end(function(error, response) {
      if (error) {
        return callback(error);
      }

      if (response.body.success) {
        callback(null, response.body.payment);
      } else {
        callback(response.body);
      }
    });
};


Client.prototype.getPayments = function(account, callback){
  var account = account || this.account;
  var url = this.api+'v1/accounts/'+account+'/payments';

  http
    .get(url)
    .end(function(error, response){
      if (error) {
        callback(error);
      } else if (response.body.success) {
        callback(null, response.body.payments);
      } else {
        callback(response.body);
      }
  });
};

Client.prototype.getTransaction = function(hash, callback){
  var url = this.api+'v1/transactions/'+hash;

  http
    .get(url)
    .end(function(error, response){
      if (error) {
        return callback(error);
      }

      if (response.body.success) {
        callback(null, response.body);
      } else {
        callback(response.body);
      }
    });
};

Client.prototype.getServerStatus = function(opts, callback){
  var url = this.api+'v1/status';
  http
    .get(url)
    .end(function(error, response) {
      if (error) {
        return callback(error);
      }

      if (response.body.success) {
        callback(null, response.body);
      } else {
        callback(response.body);
      }
    });
};


Client.prototype.updateAccountSettings = function(opts, callback) {

  var account = opts.account || this.account;
  opts.data.secret = opts.data.secret || this.secret;

  var options = {
    url: this.api + 'v1/accounts/'+account+'/settings',
    json: opts.data
  };

  http
    .post(options.url)
    .send(options.json)
    .end(function(error, response){
      if (error) {
        return callback(error);
      }

      if (response.body.success) {
        callback(null, response.body);
      } else {
        callback(response.body);
      }
    });
};


Client.prototype.getPaymentStatus = function(statusUrl, callback){

  http.
    get(statusUrl)
    .end(function(error, response){
      if (error) {
        return callback(error);
      }

      if (response.body.success) {
        callback(null, response.body.payment);
      } else {
        callback(response.body);
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
    if (response && response.state === 'validated'){
      callback(null, response);
    } else {
      setImmediate(function(){
        loopFunction(statusUrl, callback, loopFunction);
      });
    }
  });
};

Client.prototype.pollPaymentStatus = function(payment, callback){
  var self = this;
  if (payment && payment.status_url) {
    self._getAndHandlePaymentStatus(payment.status_url, callback, self._getAndHandlePaymentStatus.bind(this));
  } else {
    callback(new Error('RippleRestError:StatusUrlUnavailable'));
  }
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

  http
    .post(options.url)
    .send(options.json)
    .end(function(error, response) {
      if (error) {
        return callback(error);
      }

      if (response.body.success) {
        callback(null, response.body.trustline);
      } else {
        callback(response.body);
      }
    });

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

  http
    .get(settings.url)
    .end(function(error, response){
      if (error) {
        return callback(error);
      }

      if (response.body.success) {
        callback(null, response.body.trustlines);
      } else {
        callback(response.body);
      }
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

Client.RippleAPI = function(options) {
  switch(options.adapter.toLowerCase()) {
    case 'rest':
      return new RippleRestV1(options);
      break;
    default:
      throw new Error('InvalidAdapter')
  }
}

module.exports = Client;
