/* errorex
 ------------------------
 (c) 2017-present Panates
 This file may be freely distributed under the MIT license.
 For details and documentation:
 https://github.com/panates/errorex
 */

const format = require('util').format;
const path = require('path');
const StackFrame = require('stackframe');

const STACK_REGEXP = /^\s*at *(.*) \(?([^:]+):(?:(\d+):(\d+)|(native)|(unknown location))\)?/m;

/**
 * @class ErrorEx
 */
class ErrorEx extends Error {

  /**
   *
   * @param {string|Error} msg
   * @param {...*} args
   * @constructor
   */
  constructor(msg, ...args) {
    if (msg instanceof Error) {
      super(msg.message);
      for (const key of Object.keys(msg))
        if (['name', 'stack'].indexOf(key) < 0)
          this[key] = msg[key];
      this.stack = ErrorEx._mergeStack(msg.stack, this.stack);
    } else
      super(format(msg, ...args));
    this.name = this.constructor === ErrorEx ? 'Error' : this.constructor.name;
  }

  /**
   *
   * @param {Boolean} [noInternal=false]
   * @return {Array|*}
   */
  getStack(noInternal) {
    if (noInternal) {
      const a1 = this.stack.split(/\n/);
      const result = [];
      for (const line of a1) {
        const m = line.match(STACK_REGEXP);
        if (!m || (path.isAbsolute(m[2]) && !m[2].includes('/node_modules')))
          result.push(line);
      }
      return result.join('\n');
    }
    return this.stack;
  }

  /**
   *
   * @param {Boolean} [noInternal=false]
   * @return {Array|*}
   */
  getStackFrames(noInternal) {
    /* istanbul ignore else */
    if (!this._stackFrames)
      this._stackFrames = ErrorEx.parseStack(this.getStack(noInternal));
    return this._stackFrames;
  }

  /**
   * Sets any property to error object and returns error object
   *
   * @param {String} property
   * @param {*} value
   * @return {ErrorEx}
   */
  set(property, value) {
    if (typeof property === 'object') {
      for (const k of Object.keys(property)) {
        this[k] = property[k];
      }
    } else
      this[property] = value;
    return this;
  }

  static getCallStack(noInternal) {
    const frames = (new ErrorEx()).getStackFrames(noInternal);
    return frames.map(frame => frame.getFileName());
  }

  static parseStack(stack) {
    const stackArray = stack.split(/\n/);
    const result = [];
    for (const line of stackArray) {
      const m = line.match(STACK_REGEXP);
      if (m)
        result.push(new StackFrame({
          functionName: m[1],
          fileName: m[2],
          lineNumber: m[3],
          columnNumber: m[4],
          isNative: !!m[5],
          source: line
        }));
    }
    return result;
  }

  /**
   *
   * @param {string} org
   * @param {string} ex
   * @return {string}
   * @private
   * @static
   */
  static _mergeStack(org, ex) {
    const a1 = org.split(/\n/);
    const a2 = ex.split(/\n/).filter(line => !!line.match(STACK_REGEXP));
    /* Locate merge index */
    for (let [i1, line] of a1.entries()) {
      const i2 = a2.indexOf(line);
      if (i2 >= 0) {
        /* Merge stack lines */
        a1.splice(i1, 0, ...a2.slice(0, i2));
        return a1.join('\n');
      }
    }
    /* istanbul ignore next */
    return org;
  }
}

/**
 * @class ArgumentError
 */
class ArgumentError extends ErrorEx {

  /**
   * Sets "argumentIndex" property to error object and returns error object
   * @param {*} value
   * @return {ArgumentError}
   */
  setArgumentIndex(value) {
    return this.set('argumentIndex', value);
  };

  /**
   * Sets "argumentName" property to error object and returns error object
   * @param {*} value
   * @return {ArgumentError}
   */
  setArgumentName(value) {
    return this.set('argumentName', value);
  };

}

/**
 * @class RangeError
 */
class RangeError extends ErrorEx {
  /**
   * Sets "minValue" property to error object and returns error object
   * @param {*} value
   * @return {RangeError}
   */
  setMinValue(value) {
    return this.set('minValue', value);
  };

  /**
   * Sets "maxValue" property to error object and returns error object
   * @param {*} value
   * @return {RangeError}
   */
  setMaxValue(value) {
    return this.set('maxValue', value);
  };

}

/**
 * @class ValidateError
 */
class ValidateError extends ErrorEx {
}

/**
 * @class HttpError
 */
class HttpError extends ErrorEx {
  /**
   * Sets "minValue" property to error object and returns error object
   * @param {*} value
   * @return {HttpError}
   */
  setStatus(value) {
    return this.set('status', value);
  };
}

/**
 * @class HttpClientError
 */
class HttpClientError extends HttpError {
  /**
   * @constructor
   */
  constructor(...args) {
    super(...args);
    this.setStatus(400);
  }

}

/**
 * @class HttpServerError
 */
class HttpServerError extends HttpError {
  /**
   * @constructor
   */
  constructor(...args) {
    super(...args);
    this.setStatus(500);
  }

}

/**
 * Expose module
 */
module.exports = ErrorEx;
Object.assign(ErrorEx, {
  ErrorEx,
  ArgumentError,
  RangeError,
  HttpError,
  HttpClientError,
  HttpServerError,
  ValidateError
});
