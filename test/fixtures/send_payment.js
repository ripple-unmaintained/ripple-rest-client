'use strict';

exports.success = function(args) {
  return {
    success: true,
    client_resource_id: args.client_resource_id,
    status_url: args.status_url
  };
};

exports.error = function() {
  return {
    success: false,
    error_type: 'invalid_request',
    error: 'restINVALID_PARAMETER',
    message: 'Invalid parameter: source_account. Must be a valid Ripple address'
  };
};
