var request = require('request');

var Client = function(opts) {
  this.api = opts.api;
  this.account = opts.account;
  this.secret = opts.secret;
  this.lastTransactionHash = opts.lastTransactionHash
}

Client.prototype.send_payment = function(opts, fn){
  var url = this.api+'addresses/'+this.address+'/payments/'+this.lastTransactionHash;
  console.log(url);
  request.get({ url: url, json: true }, function(err, resp, body) {
    if (err) {
      fn(err, null);
    } else {
      fn(null, body.payment); 
    }
  }) 
};

Client.prototype.get_next_notification = function(opts, fn){
  fn();
};

Client.prototype.new_payment = function(opts, fn){
  fn();
};

Client.prototype.get_payment = function(opts, fn){
  fn();
};

Client.prototype.get_server_status = function(opts, fn){
  fn();
};

Client.prototype.get_transaction = function(opts, fn){
  fn();
};

Client.prototype.listen = function(opts){
  /* 
    1. Get the original next notification
    2. Begin checking the next notification url
    3. If transaction hash is not lastTransactionHash, emit event
  */

  // GET /api/v1/addresses/rNw4ozCG514KEjPs5cDrqEcdsi31Jtfm5r/next_notification
};

module.exports = Client;
