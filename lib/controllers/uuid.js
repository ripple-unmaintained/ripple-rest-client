const Promise = require('bluebird');
const http = Promise.promisifyAll(require('superagent'));

module.exports.generate = function generate(options) {
  return new Promise(function(resolve, reject) {
    http.get('/v1/uuid').endAsync()
    .then(function(response){
      if (response.body.success) {
        resolve(response.body.uuid);
      } else {
        reject(new Error(body));
      }
    })
    .error(reject)
  });
}

