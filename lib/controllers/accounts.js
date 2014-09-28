const Promise = require('bluebird');
const http = Promise.promisifyAll(require('superagent'));

module.exports.generate = function() {
  return new Promise(function(resolve, reject) {
    http.get('/v1/accounts/new').endAsync()
    .then(function(response){
      resolve(response.body)
    })
    .error(reject)
  });
}

