'use strict';

var _ = require('lodash');

exports.success = function(args) {
  var result = {
    success: true,
    transaction: {
      TransactionType: args.transaction.TransactionType,
      Flags: args.transaction.Flags,
      Sequence: args.transaction.Sequence,
      DestinationTag: args.transaction.DestinationTag,
      LastLedgerSequence: args.transaction.LastLedgerSequence,
      Amount: {
        value: args.transaction.Amount.value,
        currency: args.transaction.Amount.currency,
        issuer: args.transaction.Amount.issuer
      },
      Fee: args.transaction.Fee,
      SigningPubKey: args.transaction.SigningPubKey,
      TxnSignature: args.transaction.TxnSignature,
      Account: args.transaction.Account,
      Destination: args.transaction.Destination,
      date: args.transaction.date,
      hash: args.transaction.hash,
      inLedger: args.transaction.inLedger,
      ledger_index: args.transaction.ledger_index,
      meta: {
        TransactionIndex: args.transaction.meta.TransactionIndex,
        AffectedNodes: [],
        TransactionResult: args.transaction.meta.TransactionResult,
        delivered_amount: {
          value: args.transaction.meta.delivered_amount.value,
          currency: args.transaction.meta.delivered_amount.currency,
          issuer: args.transaction.meta.delivered_amount.issuer
        }
      },
      validated: args.transaction.validated
    }
  };

  _.forEach(args.transaction.meta.AffectedNodes, function(value) {
    result.transaction.meta.AffectedNodes.push({
      ModifiedNode: {
        LedgerEntryType: value.ModifiedNode.LedgerEntryType,
        PreviousTxnLgrSeq: value.ModifiedNode.PreviousTxnLgrSeq,
        PreviousTxnID: value.ModifiedNode.PreviousTxnID,
        LedgerIndex: value.ModifiedNode.LedgerIndex,
        PreviousFields: {
          Sequence: value.ModifiedNode.PreviousFields.Sequence,
          Balance: value.ModifiedNode.PreviousFields.Balance
        },
        FinalFields: {
          Flags: value.ModifiedNode.FinalFields.Flags,
          Sequence: value.ModifiedNode.FinalFields.Sequence,
          OwnerCount: value.ModifiedNode.FinalFields.OwnerCount,
          Balance: value.ModifiedNode.FinalFields.Balance,
          Account: value.ModifiedNode.FinalFields.Account
        }
      }
    });
  });

  if (args.transaction.client_resource_id) {
    result.transaction.client_resource_id = args.transaction.client_resource_id;
  }

  return result;
};

exports.error = function() {
  return {
    success: false,
    error_type: 'invalid_request',
    error: 'restINVALID_PARAMETER',
    message: 'Transaction not found. A transaction hash was not supplied and there were no entries matching the client_resource_id.'
  };
};
