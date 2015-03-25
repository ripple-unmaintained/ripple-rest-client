'use strict';

exports.success = function(args) {
  return {
    source_account: args.source_account,
    source_tag: args.source_tag,
    source_amount: {
      value: args.source_amount.value,
      currency: args.source_amount.currency,
      issuer: args.source_amount.issuer
    },
    source_slippage: args.source_slippage,
    destination_account: args.destination_account,
    destination_tag: args.destination_tag,
    destination_amount: {
      value: args.destination_amount.value,
      currency: args.destination_amount.currency,
      issuer: args.destination_amount.issuer
    },
    invoice_id: args.invoice_id,
    paths: args.paths,
    no_direct_ripple: args.no_direct_ripple,
    partial_payment: args.partial_payment,
    direction: args.direction,
    result: args.result,
    timestamp: args.timestamp,
    fee: args.fee,
    source_balance_changes: args.source_balance_changes,
    destination_balance_changes: args.destination_balance_changes,
    order_changes: args.order_changes
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
