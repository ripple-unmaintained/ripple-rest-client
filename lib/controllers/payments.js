const Promise = require('bluebird');
const http = Promise.promisifyAll(require('superagent'));

module.exports.getPayment = function(paymentHash) {
  var client = this;
  return new Promise(function(resolve, reject) {
    const url = client.api+'v1/accounts/'+client.account+'/payments/'+paymentHash;
    console.log('URL', url);
    http.get(url).endAsync()
    .then(function(response) {
      if (response.body.success) {
        resolve(response.body.payment);
      } else {
        reject(response.body)
      }
    })
    .error(reject);
  }); 
}

