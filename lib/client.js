
var Client = function(opts) {
  var api = opts.api;
  var account = opts.account;
  var secret = opts.secret;
  var lastTransactionHash = opts.lastTransactionHash
}

Client.prototype.sendPayment = function(opts, fn){
  // 1. Get the original next notification

});

Client.prototype.listen = function(opts){
  /* 
    1. Get the original next notification
    2. Begin checking the next notification url
    3. If transaction hash is not lastTransactionHash, emit event
  */

  // GET /api/v1/addresses/rNw4ozCG514KEjPs5cDrqEcdsi31Jtfm5r/next_notification
 
});

exports = {
  Client: Client
}
