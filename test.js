'use strict'

var login = require('./kenny-logins.js')
var test = require('tape')

test('login works', function (assert) {
  login({
    username: 'ok',
    password: 'sure',
    email: 'tell-me@more.i-am-surely.interested',
    npm: 'node',
    npmParams: ['--ok'],
    cwd: __dirname
  }, onlogin)

  function onlogin (err) {
    assert.equal(err, null)
    assert.end()
  }
})

test('login failure works', function (assert) {
  login({
    username: 'no',
    password: 'this is not my password',
    email: 'nor-is-this@my-email.sorry',
    npm: 'node',
    npmParams: ['--not-ok'],
    cwd: __dirname
  }, onlogin)

  function onlogin (err) {
    assert.ok(err)
    assert.equal(err.message, 'non-zero exitcode: 255')
    assert.end()
  }
})
