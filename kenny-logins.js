#!/usr/bin/env node
'use strict'

module.exports = login

var minimist = require('minimist')
var Promise = require('bluebird')
var nexpect = require('nexpect')

if (require.main === module) {
  login(parseArgs(process.argv.slice(2)), function (err) {
    if (err) {
      if (process.env.DEBUG) {
        console.error(err.stack)
      }
      process.exit(1)
    }
  })
}

function login (opts, ready) {
  if (!('username' in opts) ||
      !('password' in opts) ||
      !('email' in opts) ||
      opts.username === undefined ||
      opts.password === undefined ||
      opts.email === undefined) {
    return setTimeout(
      ready,
      0,
      new Error('login requires {username, password, email}')
    )
  }

  var deferred = Promise.defer()
  var executable = opts.npm || 'npm'
  var args = opts.npmParams || []
  args.unshift('login')

  nexpect.spawn(executable, args, {stream: 'all', cwd: opts.cwd})
    .expect('Username: ')
    .sendline(opts.username)
    .expect('Password: ')
    .sendline(opts.password)
    .expect('Email: (this IS public) ')
    .sendline(opts.email)
    .sendEof()
    .run(onrun)

  return deferred.promise.nodeify(ready)

  function onrun (err, stdout, exitcode) {
    if (err) {
      return deferred.reject(err)
    }
    if (exitcode !== 0) {
      return ready(new Error('non-zero exitcode: ' + exitcode))
    }
    return deferred.resolve(null)
  }
}

function parseArgs (argv) {
  var parsed = minimist(argv)
  return {
    'username': parsed.u || parsed.user || parsed.username || parsed._[0],
    'password': parsed.p || parsed.pass || parsed.password || parsed._[1],
    'email': parsed.e || parsed.email || parsed._[2]
  }
}
