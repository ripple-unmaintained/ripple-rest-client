const Promise = require('bluebird');
const http = Promise.promisifyAll(require('superagent'));

module.exports.get = function(options) {
  return new Promise(function(resolve, reject) {
    if (!options.account) {
      return reject(new Error('InvalidRippleAccount'));
    }
    if (!options.hash) {
      return reject(new Error('InvalidRippleTransactionHash'));
    }
    http.get('/v1/accounts/'+options.account+'/notifications/'+options.hash).endAsync()
    .then(function(response){
      if (response.body.success) {
        resolve(response.body.notification);
      } else {
        reject(new Error(body));
      }
    })
    .error(reject)
  });
}

