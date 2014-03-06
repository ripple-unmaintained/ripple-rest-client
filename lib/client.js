var request = require('request');

var Client = function(opts) {
  this.api = opts.api;
  this.account = opts.account;
  this.secret = opts.secret;
  this.lastTransactionHash = opts.lastTransactionHash
}

Client.prototype.sendPayment = function(opts, fn){
  var url = this.api+'api/v1/addresses/'+this.account+'/payments';
  request.post(url, {form: opts, json: true }, function(err, resp, body) {
    fn(err, body);
  }) 
};

Client.prototype.buildPayment = function(opts, fn){
  var amount = opts.amount + "+" + opts.currency;
  if (opts.issuer) {
    amount += ("+"+ opts.issuer);
  }
  var url = this.api+'api/v1/addresses/'+this.account+'/payments/'+opts.recipient+'/'+amount; 
  request.get(url, function(err, resp, body){
    fn(err, body);
  });  
};

Client.prototype.getNextNotification = function(opts, fn){
  var url = this.api+'api/v1/addresses/'+this.account+'/next_notification';
  request.get(url, function(err, resp, body){
    fn(err, body);
  });  
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
