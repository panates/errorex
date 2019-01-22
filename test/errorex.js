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
    assert.strictEqual(error.message, 'Error message. ok');
    assert.strictEqual(error.name, 'Error');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ErrorEx);
    assert.ok(error.stack);
  });

  it('should inherit from other Error', function() {
    const e = new Error('Error message');
    e.name = 'AnyName';
    e.param1 = 123;
    const error = new ErrorEx(e);
    assert.strictEqual(error.message, 'Error message');
    assert.strictEqual(error.name, 'Error');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ErrorEx);
    assert.strictEqual(error.param1, 123);
    assert.ok(error.stack);
  });

  it('should get stack without node internals', function() {
    const error = new ErrorEx('Error message. %s', 'ok');
    const s = error.getStack({noInternalFiles: true});
    assert(!s.includes('(internal'));
  });

  it('should get stack relative to any path', function() {
    const relativeTo = path.resolve(__dirname, '..');
    const error = new ErrorEx('Error message. %s', 'ok');
    const s = error.getStack({noInternalFiles: true, relativeTo});
    assert(!s.includes(relativeTo));
  });

  it('should get stack frames', function() {
    const error = new ErrorEx('Error message. %s', 'ok');
    const s = error.getStackFrames();
    assert(!s.includes('(internal'));
  });

  it('should get call stack', function() {
    const calls = ErrorEx.getCallStack();
    assert.strictEqual(calls[0], path.resolve(__dirname, '../lib/errorex.js'));
    assert(calls.length >= 5);
  });

  it('should get call stack without node internals', function() {
    const calls = ErrorEx.getCallStack(true);
    assert.strictEqual(calls[0], path.resolve(__dirname, '../lib/errorex.js'));
    assert(calls.length < 5);
  });

  it('should set properties with ErrorEx.set(key, value)', function() {
    const error = new ErrorEx('message')
        .set('prm1', 1)
        .set('code', 12345)
        .set('details', 'details');
    assert.strictEqual(error.prm1, 1);
    assert.strictEqual(error.code, 12345);
    assert.strictEqual(error.details, 'details');
  });

  it('should set properties with ErrorEx.set(object)', function() {
    const error = new ErrorEx('message')
        .set({
          prm1: 1,
          code: 12345,
          details: 'details'
        });
    assert.strictEqual(error.prm1, 1);
    assert.strictEqual(error.code, 12345);
    assert.strictEqual(error.details, 'details');
  });

  it('should create ArgumentError', function() {
    const error = new ArgumentError('Error message. %s', 'ok');
    assert.strictEqual(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ErrorEx);
    assert.ok(error instanceof ArgumentError);
    assert.strictEqual(error.name, 'ArgumentError');
  });

  it('should create RangeError', function() {
    const error = new RangeError('Error message. %s', 'ok')
        .setMinValue(1)
        .setMaxValue(5);
    assert.strictEqual(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ErrorEx);
    assert.ok(error instanceof RangeError);
    assert.strictEqual(error.name, 'RangeError');
    assert.strictEqual(error.minValue, 1);
    assert.strictEqual(error.maxValue, 5);
  });

  it('should create HttpError', function() {
    const error = new HttpError('Error message. %s', 'ok')
        .setStatus(404);
    assert.strictEqual(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ErrorEx);
    assert.ok(error instanceof HttpError);
    assert.strictEqual(error.name, 'HttpError');
    assert.strictEqual(error.status, 404);
  });

  it('should create HttpClientError', function() {
    const error = new HttpClientError('Error message. %s', 'ok');
    assert.strictEqual(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ErrorEx);
    assert.ok(error instanceof HttpError);
    assert.ok(error instanceof HttpClientError);
    assert.strictEqual(error.name, 'HttpClientError');
    assert.strictEqual(error.status, 400);
  });

  it('should create HttpServerError', function() {
    const error = new HttpServerError('Error message. %s', 'ok');
    assert.strictEqual(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ErrorEx);
    assert.ok(error instanceof HttpError);
    assert.ok(error instanceof HttpServerError);
    assert.strictEqual(error.name, 'HttpServerError');
    assert.strictEqual(error.status, 500);
  });

  it('should create ValidateError', function() {
    const error = new ValidateError('Error message. %s', 'ok');
    assert.strictEqual(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ErrorEx);
    assert.ok(error instanceof ValidateError);
    assert.strictEqual(error.name, 'ValidateError');
  });

});
