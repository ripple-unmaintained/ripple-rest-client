'use strict';

var _ = require('lodash');

// base error constructor
function RippleError(error) {
  this.error = error;
}

RippleError.prototype = new Error();
RippleError.prototype.name = 'RippleError';

// 400 Invalid Request
function InvalidRequestError(error) {
  this.error = error;
}

InvalidRequestError.prototype = new RippleError();
InvalidRequestError.prototype.name = 'InvalidRequestError';

// 404 Not Found
function NotFoundError(error) {
  this.error = error;
}

NotFoundError.prototype = new RippleError();
NotFoundError.prototype.name = 'NotFoundError';

// 500 Internal Server Error
function InternalServerError(error) {
  this.error = error;
}

NotFoundError.prototype = new RippleError();
NotFoundError.prototype.name = 'InternalError';

// handle error I/O
function createError(error) {
  var errorMessage = JSON.parse(error.text || ''),
      errorMap, errorData, defaults, errorReturn;

  errorMap = {
    '400': InvalidRequestError,
    '404': NotFoundError,
    '500': InternalServerError
  };

  defaults = {
    error: '',
    error_type: '',
    message: ''
  };

  errorData = {
    error: errorMessage.error,
    error_type: errorMessage.error_type,
    message: errorMessage.message
  };

  errorData = _.defaults({}, errorData, defaults);

  if (_.isFunction(errorMap[error.status])) {
    errorReturn = new errorMap[error.status](errorData);
  } else {
    errorReturn = new RippleError(errorData);
  }

  return errorReturn;
}

module.exports = createError;
