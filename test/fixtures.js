module.exports = {
  ripple_address: {
    source_account: 'r4p4gZaWSq8Cs1d8mn1jaGqVU1HUns1ek3',
    destination_account: 'rDmSZbgLbw7qkkgDXMWoiSQX7VZ6KknWcL',
    source_account_secret: process.env.RIPPLE_ACCOUNT_SECRET
  },
  responses: {
    '1_4_0': {
      errors: {
        invalid_request: {
          success: false,
          error_type: 'invalid_request',
          error: 'restINVALID_PARAMETER',
          message: 'Parameter is not a valid Ripple address: destination_account'
        }
      },
      success: {
        buildPayment: {
          "success": true,
          "payments": [
            {
              "source_account": "r4p4gZaWSq8Cs1d8mn1jaGqVU1HUns1ek3",
              "source_tag": "",
              "source_amount": {
                "value": "10",
                "currency": "GWD",
                "issuer": "rDmSZbgLbw7qkkgDXMWoiSQX7VZ6KknWcL"
              },
              "source_slippage": "0",
              "destination_account": "rDmSZbgLbw7qkkgDXMWoiSQX7VZ6KknWcL",
              "destination_tag": "",
              "destination_amount": {
                "value": "10",
                "currency": "GWD",
                "issuer": "rDmSZbgLbw7qkkgDXMWoiSQX7VZ6KknWcL"
              },
              "invoice_id": "",
              "paths": "[]",
              "partial_payment": false,
              "no_direct_ripple": false
            }
          ]
        },
        buildPaymentMultipleSourceCurrencies: {
          "success": true,
          "payments": [
            {
              "source_account": "r4p4gZaWSq8Cs1d8mn1jaGqVU1HUns1ek3",
              "source_tag": "",
              "source_amount": {
                "value": "10",
                "currency": "GWD",
                "issuer": ""
              },
              "source_slippage": "0",
              "destination_account": "rDmSZbgLbw7qkkgDXMWoiSQX7VZ6KknWcL",
              "destination_tag": "",
              "destination_amount": {
                "value": "10",
                "currency": "GWD",
                "issuer": "rDmSZbgLbw7qkkgDXMWoiSQX7VZ6KknWcL"
              },
              "invoice_id": "",
              "paths": "[]",
              "partial_payment": false,
              "no_direct_ripple": false
            }
          ]
        }
      }
    }
  }
};
