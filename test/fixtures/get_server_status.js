'use strict';

exports.success = function(args) {
  return {
    success: true,
    api_documentation_url: 'https://github.com/ripple/ripple-rest',
    rippled_server_url: 'wss://s1.ripple.com:443',
    rippled_server_status: {
      build_version: args.rippled_server_status.build_version,
      complete_ledgers: args.rippled_server_status.complete_ledgers,
      hostid: args.rippled_server_status.hostid,
      io_latency_ms: args.rippled_server_status.io_latency_ms,
      last_close: {
        converge_time_s: args.rippled_server_status.last_close.converge_time_s,
        proposers: args.rippled_server_status.last_close.proposers
      },
      load_factor: args.rippled_server_status.load_factor,
      peers: args.rippled_server_status.peers,
      pubkey_node: args.rippled_server_status.pubkey_node,
      server_state: args.rippled_server_status.server_state,
      validated_ledger: {
        age: args.rippled_server_status.validated_ledger.age,
        base_fee_xrp: args.rippled_server_status.validated_ledger.base_fee_xrp,
        hash: args.rippled_server_status.validated_ledger.hash,
        reserve_base_xrp: args.rippled_server_status.validated_ledger.reserve_base_xrp,
        reserve_inc_xrp: args.rippled_server_status.validated_ledger.reserve_inc_xrp,
        seq: args.rippled_server_status.validated_ledger.seq
      },
      validation_quorum: args.rippled_server_status.validation_quorum
    }
  };
};
