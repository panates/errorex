/* eslint-disable */
const assert = require('assert');
const path = require('path');
const ErrorEx = require('../');
const {
  ArgumentError,
  RangeError,
  HttpError,
  HttpClientError,
  HttpServerError,
  ValidateError
} = ErrorEx;

describe('ErrorEx', function() {

  it('should create ErrorEx', function() {
    const error = new ErrorEx('Error message. %s', 'ok');
    assert.equal(error.message, 'Error message. ok');
    assert.equal(error.name, 'Error');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ErrorEx);
    assert.ok(error.stack);
  });

  it('should inherit from other Error', function() {
    const e = new Error('Error message');
    e.name = 'AnyName';
    e.param1 = 123;
    const error = new ErrorEx(e);
    assert.equal(error.message, 'Error message');
    assert.equal(error.name, 'Error');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ErrorEx);
    assert.equal(error.param1, 123);
    assert.ok(error.stack);
  });

  it('should get stack without node internals', function() {
    const error = new ErrorEx('Error message. %s', 'ok');
    const s = error.getStack(true);
    assert(!s.includes('(internal'));
  });

  it('should get stack frames', function() {
    const error = new ErrorEx('Error message. %s', 'ok');
    const s = error.getStackFrames();
    assert(!s.includes('(internal'));
  });

  it('should get call stack', function() {
    const calls = ErrorEx.getCallStack();
    assert.equal(calls[0], path.resolve(__dirname, '../lib/errorex.js'));
    assert.equal(calls[1], path.resolve(__filename));
    assert(calls.length >= 5);
  });

  it('should get call stack without node internals', function() {
    const calls = ErrorEx.getCallStack(true);
    assert.equal(calls[0], path.resolve(__dirname, '../lib/errorex.js'));
    assert.equal(calls[1], path.resolve(__filename));
    assert(calls.length < 5);
  });

  it('should set properties with ErrorEx.set(key, value)', function() {
    const error = new ErrorEx('message')
        .set('prm1', 1)
        .set('code', 12345)
        .set('details', 'details');
    assert.equal(error.prm1, 1);
    assert.equal(error.code, 12345);
    assert.equal(error.details, 'details');
  });

  it('should set properties with ErrorEx.set(object)', function() {
    const error = new ErrorEx('message')
        .set({
          prm1: 1,
          code: 12345,
          details: 'details'
        });
    assert.equal(error.prm1, 1);
    assert.equal(error.code, 12345);
    assert.equal(error.details, 'details');
  });

  it('should create ArgumentError', function() {
    const error = new ArgumentError('Error message. %s', 'ok')
        .setArgumentIndex(1)
        .setArgumentName('arg1');
    assert.equal(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ErrorEx);
    assert.ok(error instanceof ArgumentError);
    assert.equal(error.name, 'ArgumentError');
    assert.equal(error.argumentIndex, 1);
    assert.equal(error.argumentName, 'arg1');
  });

  it('should create RangeError', function() {
    const error = new RangeError('Error message. %s', 'ok')
        .setMinValue(1)
        .setMaxValue(5);
    assert.equal(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ErrorEx);
    assert.ok(error instanceof RangeError);
    assert.equal(error.name, 'RangeError');
    assert.equal(error.minValue, 1);
    assert.equal(error.maxValue, 5);
  });

  it('should create HttpError', function() {
    const error = new HttpError('Error message. %s', 'ok')
        .setStatus(404);
    assert.equal(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ErrorEx);
    assert.ok(error instanceof HttpError);
    assert.equal(error.name, 'HttpError');
    assert.equal(error.status, 404);
  });

  it('should create HttpClientError', function() {
    const error = new HttpClientError('Error message. %s', 'ok');
    assert.equal(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ErrorEx);
    assert.ok(error instanceof HttpError);
    assert.ok(error instanceof HttpClientError);
    assert.equal(error.name, 'HttpClientError');
    assert.equal(error.status, 400);
  });

  it('should create HttpServerError', function() {
    const error = new HttpServerError('Error message. %s', 'ok');
    assert.equal(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ErrorEx);
    assert.ok(error instanceof HttpError);
    assert.ok(error instanceof HttpServerError);
    assert.equal(error.name, 'HttpServerError');
    assert.equal(error.status, 500);
  });

  it('should create ValidateError', function() {
    const error = new ValidateError('Error message. %s', 'ok');
    assert.equal(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ErrorEx);
    assert.ok(error instanceof ValidateError);
    assert.equal(error.name, 'ValidateError');
  });

});