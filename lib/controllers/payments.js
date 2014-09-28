const Promise = require('bluebird');
const http = Promise.promisifyAll(require('superagent'));

module.exports.getHistory = function getHistory(paymentHash) {
  var client = this;
  return new Promise(function(resolve, reject) {
    http
      .get(client.api+'/v1/accounts/'+options.account+'/payments/'+paymentHash)
      .endAsync()
      .then(function(response) {
        if (response.body.success) {
          resolve(response.body.payment);
        } else {
          if (response.body.message.match('Not a payment')) {
            reject(new Error('TransactionNotPayment'));
          } else {
            reject(response.body)
          }
        }
      })
      .error(reject);
  }); 
}

module.exports.prepare = function prepare(options) {
  return new Promise(function(resolve, reject) {

  });
}

module.exports.submit = function submit(options) {
  var client = this;
  return new Promise(function(resolve, reject) {
    http
      .post(client.api+'/v1/accounts/'+options.account+'/payments')
      .send(options)
      .endAsync()  
      .then(function(response) {
        if (response.body.success) {
          resolve(response.body.payment);
        } else {
          reject(response.body);
        }
      })
      .error(reject)
  });
}

module.exports.confirm = function confirm(options) {
  return new Promise(function(resolve, reject) {
    http
      .get(client.api+'/v1/accounts/'+options.account+'/payments/'+paymentHash)
      .endAsync()
      .then(function(response) {
        if (response.body.success) {
          resolve(response.body.payment);
        } else {
          reject(new Error(response.body));
        }
      })
      .error(function(error) {
        reject(new Error(error));
      });
  });
}

