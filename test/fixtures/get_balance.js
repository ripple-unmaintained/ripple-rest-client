'use strict';

var _ = require('lodash');

exports.success = function(args) {
  var fixture = {
    success: true,
    ledger: args.ledger,
    validated: args.validated,
    balances: []
  };

  _.forEach(args.balances, function(body) {
    fixture.balances.push({
      value: body.value,
      currency: body.currency,
      counterparty: body.counterparty
    });
  });

  return fixture;
};

exports.error = function() {
  return {
    error: 'restINVALID_PARAMETER',
    error_type: 'invalid_request',
    message: 'Parameter is not a valid Ripple address: account'
  };
};
