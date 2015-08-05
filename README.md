# kenny-logins

a module for logging into npm, comes with a command line!

## API

### `kennyLogins({username, password, email[, npm='npm', npmParams=[]]}, ready)`

Uses `nexpect` to run `npm login` with the given parameters. Calls `ready` with
an error (when there's been an error!) or `null` if everything is ok.

## CLI

### `kenny-logins --user=username --pass=password --email=email`

Returns 0 on success, 1 on failure.

## License

ISC
