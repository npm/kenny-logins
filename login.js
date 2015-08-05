'use strict'

var assert = require('assert')

if (process.argv[2] === '--ok') {
  runOk()
} else {
  runNotOk()
}

function runOk () {
  process.stderr.write('Username: ')
  process.stdin.once('data', onusername)

  function onusername (datum) {
    assert.equal(datum.toString(), 'ok\n')
    process.stderr.write('Password: ')
    process.stdin.once('data', onpassword)
  }

  function onpassword (datum) {
    assert.equal(datum.toString(), 'sure\n')
    process.stderr.write('Email: (this IS public) ')
    process.stdin.once('data', onemail)
  }

  function onemail (datum) {
    assert.equal(datum.toString(), 'tell-me@more.i-am-surely.interested\n')
  }
}

function runNotOk () {
  process.stderr.write('Username: ')
  process.stdin.once('data', onusername)

  function onusername (datum) {
    assert.equal(datum.toString(), 'no\n')
    process.stderr.write('Password: ')
    process.stdin.once('data', onpassword)
  }

  function onpassword (datum) {
    assert.equal(datum.toString(), 'this is not my password\n')
    process.stderr.write('Email: (this IS public) ')
    process.stdin.once('data', onemail)
  }

  function onemail (datum) {
    assert.equal(datum.toString(), 'nor-is-this@my-email.sorry\n')
    process.exit(255)
  }
}
