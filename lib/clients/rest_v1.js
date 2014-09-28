const requireAll = require('require-all');
const controllers = requireAll(__dirname+'/../controllers');

function RippleRESTClient(options) {
  this.url = options.url || 'http://127.0.0.1:5990';
  this.version = 1;
}

RippleRESTClient.prototype = {
  generateAccount: function() {
    controllers.accounts.generate.call(this);
  },
  
  getAccountBalances: function(options) {
    controllers.balances.get.call(this, options);
  },

  getAccountSettings: function(options) {
    controllers.settings.get.call(this, options);
  },

  updateAccountSettings: function(options) {
    controllers.settings.update.call(this, options);
  },

  preparePayment: function(options) {
    controllers.payments.prepare.call(this, options);
  }, 

  submitPayment: function(options) {
    controllers.payments.submit.call(this, options);
  },

  confirmPayment: function(options) {
    controllers.payments.confirm.call(this, options);
  },

  getPaymentHistory: function(options) {
    controllers.payments.getHistory.call(this, options);
  },

  getTrustlines: function(options) {
    controllers.trustlines.get.call(this, options);
  },
  
  grantTrustline: function(options) {
    controllers.trustlines.grant.call(this, options);
  },
  
  checkNotifications: function(options) {
    controllers.notifications.check.call(this, options);
  },

  retrieveRippleTransaction: function(options) {
    controllers.transactions.retrieve.call(this, options);
  },

  generateUUID: function() {
    controllers.uuids.generate.call(this, options);
  }
}

module.exports = RippleRESTClient;

