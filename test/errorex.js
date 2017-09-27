/* eslint-disable */
const assert = require('assert');
const erx = require('../');

describe('ErrorEx', function() {

  it('test ErrorEx', function(done) {
    var error = erx.ErrorEx('Error message. %s', 'ok');
    assert.equal(error.message, 'Error message. ok');
    assert.equal(error.name, 'Error');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof erx.ErrorEx);
    assert.ok(error.stack);
    done();
  });

  it('test ErrorEx.set(key, value)', function(done) {
    var error = erx.ErrorEx('message');
    error.set('prm1', 1);
    error.setCode(12345);
    error.setDetails('details');
    assert.equal(error.prm1, 1);
    assert.equal(error.code, 12345);
    assert.equal(error.details, 'details');
    done();
  });

  it('test ErrorEx.set(object)', function(done) {
    var error = erx.ErrorEx('message');
    error.set({
      prm1: 1,
      code: 12345,
      details: 'details'
    });
    assert.equal(error.prm1, 1);
    assert.equal(error.code, 12345);
    assert.equal(error.details, 'details');
    done();
  });

  it('test ArgumentError', function(done) {
    var error = erx.ArgumentError('Error message. %s', 'ok');
    error.setArgumentIndex(1);
    error.setArgumentName('arg1');
    assert.equal(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof erx.ErrorEx);
    assert.ok(error instanceof erx.ArgumentError);
    assert.equal(error.name, 'ArgumentError');
    assert.equal(error.argumentIndex, 1);
    assert.equal(error.argumentName, 'arg1');
    done();
  });

  it('test RangeError', function(done) {
    var error = erx.RangeError('Error message. %s', 'ok');
    error.setMinValue(1);
    error.setMaxValue(5);
    assert.equal(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof erx.ErrorEx);
    assert.ok(error instanceof erx.RangeError);
    assert.equal(error.name, 'RangeError');
    assert.equal(error.minValue, 1);
    assert.equal(error.maxValue, 5);
    done();
  });

  it('test HttpError', function(done) {
    var error = erx.HttpError('Error message. %s', 'ok');
    error.setStatus(404);
    assert.equal(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof erx.ErrorEx);
    assert.ok(error instanceof erx.HttpError);
    assert.equal(error.name, 'HttpError');
    assert.equal(error.status, 404);
    done();
  });

  it('test HttpClientError', function(done) {
    var error = erx.HttpClientError('Error message. %s', 'ok');
    assert.equal(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof erx.ErrorEx);
    assert.ok(error instanceof erx.HttpError);
    assert.ok(error instanceof erx.HttpClientError);
    assert.equal(error.name, 'HttpClientError');
    assert.equal(error.status, 400);
    done();
  });

  it('test HttpServerError', function(done) {
    var error = erx.HttpServerError('Error message. %s', 'ok');
    assert.equal(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof erx.ErrorEx);
    assert.ok(error instanceof erx.HttpError);
    assert.ok(error instanceof erx.HttpServerError);
    assert.equal(error.name, 'HttpServerError');
    assert.equal(error.status, 500);
    done();
  });

  it('test ValidateError', function(done) {
    var error = erx.ValidateError('Error message. %s', 'ok');
    assert.equal(error.message, 'Error message. ok');
    assert.ok(error instanceof Error);
    assert.ok(error instanceof erx.ErrorEx);
    assert.ok(error instanceof erx.ValidateError);
    assert.equal(error.name, 'ValidateError');
    done();
  });

});