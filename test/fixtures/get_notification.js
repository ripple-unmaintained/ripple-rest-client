'use strict';

exports.success = function(args) {
  return {
    account: args.account,
    type: args.type,
    direction: args.direction,
    state: args.state,
    result: args.result,
    ledger: args.ledger,
    hash: args.hash,
    timestamp: args.timestamp,
    transaction_url: args.transaction_url,
    previous_hash: args.previous_hash,
    previous_notification_url: args.previous_notification_url,
    next_hash: args.next_hash,
    next_notification_url: args.next_notification_url,
    next_notification_hash: args.next_notification_hash
  };
};

exports.error = function() {
  return {
    success: false,
    error_type: 'invalid_request',
    error: 'restINVALID_PARAMETER',
    message: 'Transaction not found. A transaction hash was not supplied and there were no entries matching the client_resource_id.'
  };
};
