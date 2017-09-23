/* errorex
 ------------------------
 (c) 2017-present Panates
 This file may be freely distributed under the MIT license.
 For details and documentation:
 https://github.com/panates/errorex
 */

const format = require('util').format;

/**
 * ErrorEx Class
 * @param {String} msg
 * @param {...*} vargs
 * @return {ErrorEx}
 * @constructor
 */
function ErrorEx(msg, vargs) {
  if (!(this instanceof ErrorEx))
    return ErrorEx.apply(Object.create(ErrorEx.prototype), arguments);

  var tmp = Error.apply(this, [format.apply(this, arguments)]);
  this.name = this.constructor === ErrorEx ? 'Error' : this.constructor.name;
  this.message = tmp.message;
  Error.captureStackTrace(this, ErrorEx);
  return this;
}

var IntermediateInheritor = function() {};
IntermediateInheritor.prototype = Error.prototype;
ErrorEx.prototype = new IntermediateInheritor();

/**
 * Sets any property to error object and returns error object
 * @param {String} property
 * @param {*} value
 * @return {ErrorEx}
 */
ErrorEx.prototype.set = function(property, value) {
  this[property] = value;
  return this;
};

/**
 * Sets "code" property to error object and returns error object
 * @param {*} value
 * @return {ErrorEx}
 */
ErrorEx.prototype.setCode = function(value) {
  return this.set('code', value);
};

/**
 * Sets "details" property to error object and returns error object
 * @param {*} value
 * @return {ErrorEx}
 */
ErrorEx.prototype.setDetails = function(value) {
  return this.set('details', value);
};

/**
 * ArgumentError Class
 * @return {ArgumentError}
 * @constructor
 */
function ArgumentError() {
  if (!(this instanceof ArgumentError))
    return ArgumentError.apply(Object.create(ArgumentError.prototype), arguments);

  ErrorEx.apply(this, arguments);
}

ArgumentError.prototype = Object.create(ErrorEx.prototype);
ArgumentError.prototype.constructor = ArgumentError;

/**
 * Sets "argumentIndex" property to error object and returns error object
 * @param {*} value
 * @return {ErrorEx}
 */
ArgumentError.prototype.setArgumentIndex = function(value) {
  return this.set('argumentIndex', value);
};

/**
 * Sets "argumentName" property to error object and returns error object
 * @param {*} value
 * @return {ErrorEx}
 */
ArgumentError.prototype.setArgumentName = function(value) {
  return this.set('argumentName', value);
};

/**
 * RangeError Class
 * @return {RangeError}
 * @constructor
 */
function RangeError() {
  if (!(this instanceof RangeError))
    return RangeError.apply(Object.create(RangeError.prototype), arguments);

  ErrorEx.apply(this, arguments);
}

RangeError.prototype = Object.create(ErrorEx.prototype);
RangeError.prototype.constructor = RangeError;

/**
 * Sets "minValue" property to error object and returns error object
 * @param {*} value
 * @return {ErrorEx}
 */
RangeError.prototype.setMinValue = function(value) {
  return this.set('minValue', value);
};

/**
 * Sets "maxValue" property to error object and returns error object
 * @param {*} value
 * @return {ErrorEx}
 */
RangeError.prototype.setMaxValue = function(value) {
  return this.set('maxValue', value);
};

/**
 * HttpError Class
 * @return {HttpError}
 * @constructor
 */
function HttpError() {
  if (!(this instanceof HttpError))
    return HttpError.apply(Object.create(HttpError.prototype), arguments);

  ErrorEx.apply(this, arguments);
}

HttpError.prototype = Object.create(ErrorEx.prototype);
HttpError.prototype.constructor = HttpError;

/**
 * Sets "minValue" property to error object and returns error object
 * @param {*} value
 * @return {ErrorEx}
 */
HttpError.prototype.setStatus = function(value) {
  return this.set('status', value);
};

/**
 * HttpClientError Class
 * @return {HttpClientError}
 * @constructor
 */
function HttpClientError() {
  if (!(this instanceof HttpClientError))
    return HttpClientError.apply(Object.create(HttpClientError.prototype), arguments);

  ErrorEx.apply(this, arguments);
  this.status = 400;
}

HttpClientError.prototype = Object.create(HttpError.prototype);
HttpClientError.prototype.constructor = HttpClientError;

/**
 * HttpServerError Class
 * @return {HttpServerError}
 * @constructor
 */
function HttpServerError() {
  if (!(this instanceof HttpServerError))
    return HttpServerError.apply(Object.create(HttpServerError.prototype), arguments);

  ErrorEx.apply(this, arguments);
  this.status = 500;
}

HttpServerError.prototype = Object.create(HttpError.prototype);
HttpServerError.prototype.constructor = HttpServerError;

/**
 * Expose module
 */
module.exports = {
  ErrorEx: ErrorEx,
  ArgumentError: ArgumentError,
  RangeError: RangeError,
  HttpError: HttpError,
  HttpClientError: HttpClientError,
  HttpServerError: HttpServerError
};

