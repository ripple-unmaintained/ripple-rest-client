'use strict';

exports.success = function(args) {
  return {
    success: true,
    payment: {
      source_account: args.payment.source_account,
      source_tag: args.payment.source_tag,
      source_amount: {
        value: args.payment.source_amount.value,
        currency: args.payment.source_amount.currency,
        issuer: args.payment.source_amount.issuer
      },
      source_slippage: args.payment.source_slippage,
      destination_account: args.payment.destination_account,
      destination_tag: args.payment.destination_tag,
      destination_amount: {
        value: args.payment.destination_amount.value,
        currency: args.payment.destination_amount.currency,
        issuer: args.payment.destination_amount.issuer
      },
      invoice_id: args.payment.invoice_id,
      paths: args.payment.paths,
      no_direct_ripple: args.payment.no_direct_ripple,
      partial_payment: args.payment.partial_payment,
      direction: args.payment.direction,
      result: args.payment.result,
      timestamp: args.payment.timestamp,
      fee: args.payment.fee,
      balance_changes: args.payment.balance_changes,
      source_balance_changes: args.payment.source_balance_changes,
      destination_balance_changes: args.payment.destination_balance_changes,
      order_changes: args.payment.order_changes
    },
    client_resource_id: args.client_resource_id,
    hash: args.hash,
    ledger: args.ledger,
    state: args.state
  };
};

exports.error = function() {
  return {
    success: false,
    error_type: 'invalid_request',
    error: 'restINVALID_PARAMETER',
    message: 'Invalid parameter: destination_account. Must be a valid Ripple address'
  };
};
