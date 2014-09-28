const Promise = require('bluebird');
const http = Promise.promisifyAll(require('superagent'));

module.exports.get = function(options) {
  return new Promise(function(resolve, reject) {
    if (!options.account) {
      return reject(new Error('InvalidRippleAccount'));
    }
    http
      .get('/v1/accounts/'+options.account+'/settings')
      .endAsync()
      .then(function(response){
        if (response.body.success) {
          resolve(response.body.settings);
        } else {
          reject(new Error(body));
        }
      })
      .error(reject)
  });
}

module.exports.update = function(options) {
  return new Promise(function(resolve, reject) {
    if (!options.account) {
      return reject(new Error('InvalidRippleAccount'));
    }
    http
      .post('/v1/accounts/'+options.account+'/settings')
      .send(options)
      .endAsync()
      .then(function(response){
        if (response.body.success) {
          resolve(response.body.settings);
        } else {
          reject(new Error(body));
        }
      })
      .error(reject)
  });
}

