var Client = require('../lib/client');

var client = new Client({
  api: 'http://localhost:5990/',
  account: 'rUC2yaGet1kGWdvf6d7MJ27PqBx44sT9yP',
  secret: ''
});


var paymentHash = 'DA4EC693170FA31CC1053D82AE24C35C00DF656AFD583450A9C36ECC6AFFBD7D';

client.getNotification(paymentHash, function(err, notification) {
  if (notification.next_notification_url) {
    client.getNextPayment(paymentHash, function(err, payment) {
      console.log(payment);
    });
  } else {
    console.log('no next notification');
  }
});
