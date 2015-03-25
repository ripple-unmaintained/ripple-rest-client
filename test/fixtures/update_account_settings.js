'use strict';

exports.success = function(args) {
  return {
    success: true,
    settings: {
      require_destination_tag: args.settings.require_destination_tag,
      require_authorization: args.settings.require_authorization,
      disallow_xrp: args.settings.disallow_xrp
    },
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
    message: 'Parameter missing: secret'
  };
};
