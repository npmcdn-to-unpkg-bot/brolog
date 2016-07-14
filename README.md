# brolog  [![Build Status](https://travis-ci.org/zixia/brolog.svg?branch=master)](https://travis-ci.org/zixia/brolog)

Npmlog for Browser

This logger simulate the basic npmlog behaviour in browser.

[![npm version](https://badge.fury.io/js/brolog.svg)](https://badge.fury.io/js/brolog)

# Basic Usage

```
var log = require('brolog')

// additional stuff ---------------------------+
// message ----------+                         |
// prefix ----+      |                         |
// level -+   |      |                         |
//        v   v      v                         v
    log.info('fyi', 'I have a kitty cat: %j', myKittyCat)
```

## log.level()

* {String}

The level to display logs at.  Any logs at or above this level will be
displayed.  The special level `silent` will prevent anything from being
displayed ever.

## log.log(level, prefix, message, ...)

* `level` {String} The level to emit the message at
* `prefix` {String} A string prefix.  Set to "" to skip.
* `message...` Arguments to `util.format`

Emit a log message at the specified level.

## log\[level](prefix, message, ...)

For example,

* log.silly(prefix, message, ...)
* log.verbose(prefix, message, ...)
* log.info(prefix, message, ...)
* log.warn(prefix, message, ...)
* log.error(prefix, message, ...)

Like `log.log(level, prefix, message, ...)`.  In this way, each level is
given a shorthand, so you can do `log.info(prefix, message)`.

# Line Number

https://gist.github.com/paulirish/c307a5a585ddbcc17242
http://stackoverflow.com/questions/11308239/console-log-wrapper-that-keeps-line-numbers-and-supports-most-methods
