'use strict';

exports.success = function(args) {
  return {
    account: args.account,
    counterparty: args.counterparty,
    currency: args.currency,
    limit: args.limit,
    reciprocated_limit: args.reciprocated_limit,
    account_allows_rippling: args.account_allows_rippling,
    counterparty_allows_rippling: args.counterparty_allows_rippling,
    account_trustline_frozen: args.account_trustline_frozen,
    counterparty_trustline_frozen: args.counterparty_trustline_frozen
  };
};

exports.error = function(args) {
  return {
    success: false,
    error_type: 'invalid_request',
    error: 'restINVALID_PARAMETER',
    message: 'Parameter is not a valid Ripple address: account'
  };
};
