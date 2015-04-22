'use strict';

exports.success = function(args) {
  return [
	{
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
	}
  ]
};
