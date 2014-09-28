const Promise = require('bluebird');
const http = Promise.promisifyAll(require('superagent'));

module.exports.retrieveRippleTransaction = function(options) {
  if (!options.hash) {
    return reject(new Error('InvalidRippleTransactionHash'));
  }
  return new Promise(function(resolve, reject) {
    http.get('/v1/transactions/'+options.hash).endAsync()
    .then(function(response){
      if (response.body.success) {
        resolve(response.body.transaction);
      } else {
        reject(new Error(body));
      }
    })
    .error(reject)
  });
}

