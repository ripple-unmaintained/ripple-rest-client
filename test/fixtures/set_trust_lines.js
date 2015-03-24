'use strict';

exports.success = function(args) {
  return {
    account: args.account,
    limit: args.limit,
    currency: args.currency,
    counterparty: args.counterparty,
    account_allows_rippling: args.account_allows_rippling,
    account_trustline_frozen: args.account_trustline_frozen
  };
};

exports.error = function() {
  return {
    success: false,
    error_type: 'invalid_request',
    error: 'restINVALID_PARAMETER',
    message: 'Parameter missing: secret'
  };
};
