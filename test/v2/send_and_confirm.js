const Client = require(__dirname+'/../');

var client = new Client({
  account: '',
  secret: ''
});

client.sendPayment({
  destination: 'stevenzeiler',
  to_amount: 1,
  to_currency: 'XRP',
  confirm: true
})
.then(function(payment) {
  console.log('successfully submitted');
  console.log(payment);
})
.catch(Client.NetworkError, function(error) {
  console.log('error', error);
})
.catch(Client.InsufficientFunds, function(error) {
  console.log('error', error);
})
.catch(Client.PathDry, function(error) {
  console.log('error', error);
})
.catch(Client.InvalidPayment, (function(error){
  console.log('error', error);
})
.catch(Client.InvalidSecret, function(error) {
  console.log('error', error);
})
.catch(Error, function(error) {
  console.log('error', error);
});

