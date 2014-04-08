var Client = require('../');

var client = new Client({
    api: 'http://localhost:5990/',
    account: process.argv[2],
    secret: ''
});

client.confirmPayment(process.argv[3], function(err, payment) {
  console.log(err, payment);  
});

