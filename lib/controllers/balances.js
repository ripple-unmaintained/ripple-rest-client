const Promise = require('bluebird');
const http = Promise.promisifyAll(require('superagent'));

module.exports.get = function(options) {
  if (!options.account) {
    return reject(new Error('InvalidRippleAccount'));
  }
  return new Promise(function(resolve, reject) {
    http.get('/v1/accounts/'+options.account+'/balances').endAsync()
    .then(function(response){
      if (response.body.success) {
        resolve(response.body.balances);
      } else {
        reject(new Error(body));
      }
    })
    .error(reject)
  });
}

