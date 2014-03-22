var Client = require('../lib/client');

var client = new Client({
  api: 'http://localhost:5990/',
  account: 'rUC2yaGet1kGWdvf6d7MJ27PqBx44sT9yP',
  secret: ''
});

var paymentHash = 'DA4EC693170FA31CC1053D82AE24C35C00DF656AFD583450A9C36ECC6AFFBD7D';

client.getPayment(paymentHash, function(err, payment) {
  if (err) {
    console.log(payment);
  } else {
    console.log(payment);
  }
});

client.getNextNotification(paymentHash, function(err, notification) {
  if (err) {
    console.log(notification);
  } else {
    console.log(notification);
  }
});
