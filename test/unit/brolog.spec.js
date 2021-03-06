'use strict'

const test = require('tap').test
const sinon = require('sinon')

const Brolog = require('../..')

test('Brolog factory/service/function init test', t => {

  const EXPECTED_LEVEL = 'SILL'

  /**
   *
   * Raw
   *
   */
  var l = Brolog.level()
  t.equal(l, 'INFO', 'should has default level INFO')

  l = Brolog.level(EXPECTED_LEVEL)
  t.equal(l, EXPECTED_LEVEL, 'should be EXPECTED_LEVEL after setlevel to it')

  /**
   *
   * Factory
   *
   */
  var LogClass = Brolog(EXPECTED_LEVEL)
  t.equal(typeof LogClass, 'function', 'should return a function class when we call Brolog as factory')

  var log = new LogClass()
  t.equal(typeof log, 'function', 'should still return function when we call new Brolog as class')

  var dl = log.defaultLevel()
  var ll = log.level()
  t.equal(dl, EXPECTED_LEVEL, 'should has default level as EXPECTED_LEVEL after factory & class init')
  t.equal(ll, EXPECTED_LEVEL, 'should has current level as EXPECTED_LEVEL after factory & class init')

  Brolog.defaultLevel('SILENT')
  Brolog.level('SILENT')

  /**
   *
   * Constructor
   *
   */
  log = Brolog(EXPECTED_LEVEL)
  dl = log.defaultLevel()
  ll = log.level()
  t.equal(dl, EXPECTED_LEVEL, 'should has default level as EXPECTED_LEVEL after function init')
  t.equal(ll, EXPECTED_LEVEL, 'should has current level as EXPECTED_LEVEL after function init')

  t.end()
})

test('Brolog log level test', t => {
  const log = Brolog
  let l // level

  t.throws(function() {
    log.level('UN_EXIST_LEVEL')
  }, 'should throw Exception when level set to UNKNOWN')

  t.throws(function() {
    log.defaultLevel('UN_EXIST_LEVEL')
  }, 'should throw Exception when defaultLevel set to UNKNOWN')

  log.level('ERR')
  l = log.level()
  t.equal(l, 'ERR', 'should be ERR after level set to ERR')
  // alias
  log.level('ERROR')
  l = log.level()
  t.equal(l, 'ERR', 'should be ERR after level set to ERROR')

  log.level('WARN')
  l = log.level()
  t.equal(l, 'WARN', 'should be WARN after level set to WARN')

  log.level('INFO')
  l = log.level()
  t.equal(l, 'INFO', 'should be INFO after level set to INFO')

  log.level('VERB')
  l = log.level()
  t.equal(l, 'VERB', 'should be ERR after level set to VERB')
  // alias
  log.level('VERBOSE')
  l = log.level()
  t.equal(l, 'VERB', 'should be ERR after level set to VERBOSE')

  log.level('SILL')
  l = log.level()
  t.equal(l, 'SILL', 'should be SILL after level set to SILL')
  // alias
  log.level('SILLY')
  l = log.level()
  t.equal(l, 'SILL', 'should be SILL after level set to SILLY')

  t.end()
})

/**
 *
 * This test must be the last one,
 * because monkey patch is not recover when it finish
 *
 */
test('Brolog filter test', t => {
  const logFuncList = [
    'error'
    , 'warn'
    , 'info'
    , 'log'
  ]

  let log

  log = Brolog('SILENT')
  log.test = sinon.test(function() {
    logFuncList.forEach(logFunc => this.stub(console, logFunc))
    doLog(log)
    t.ok(console.error.notCalled, 'should not call error with level SILENT ##############')
  })
  log.test()

  log = Brolog('SILLY')
  log.test = sinon.test(function() {
    logFuncList.forEach(logFunc => this.stub(console, logFunc))
    doLog(log)
    t.equal(console.log.callCount, 2, 'should call log(verbose + silly) 2 time with level SILLY')
  })
  log.test()

  log = Brolog
  log.level('SILENT')
  log.test = sinon.test(function() {
    logFuncList.forEach(logFunc => this.stub(console, logFunc))
    doLog(log)
    t.equal(console.error.callCount , 0, 'should call error 0 time with level SILENT')
    t.equal(console.warn.callCount  , 0, 'should call warn 0 time with level SILENT')
    t.equal(console.info.callCount  , 0, 'should call info 0 time with level SILENT')
    t.equal(console.log.callCount   , 0, 'should call log(verbose + silly) 0 time with level SILENT')
  })
  log.test()

  log.level('ERR')
  log.test = sinon.test(function() {
    logFuncList.forEach(logFunc => this.stub(console, logFunc))
    doLog(log)
    t.equal(console.error.callCount , 1, 'should call error 1 time with level ERR')
    t.equal(console.warn.callCount  , 0, 'should call warn 0 time with level ERR')
    t.equal(console.info.callCount  , 0, 'should call info 0 time with level ERR')
    t.equal(console.log.callCount   , 0, 'should call log(verbose + silly) 0 time with level ERR')
  })
  log.test()

  log.level('VERBOSE')

  log.test = sinon.test(function() {
    logFuncList.forEach(logFunc => this.stub(console, logFunc))
    doLog(log)
    t.equal(console.error.callCount , 1, 'should call error 1 time with level VERBOSE')
    t.equal(console.warn.callCount  , 1, 'should call warn 1 time with level VERBOSE')
    t.equal(console.info.callCount  , 1, 'should call info 1 time with level VERBOSE')
    t.equal(console.log.callCount   , 1, 'should call log(verbose + silly) 1 time with level VERBOSE')
  })
  log.test()

  t.end()

  ////////////////////////////////////////////
  function doLog(logger) {
    logger.error('Test', 'error message')
    logger.warn('Test', 'warn message')
    logger.info('Test', 'info message')
    logger.verbose('Test', 'verbose message')
    logger.silly('Test', 'silly message')
  }
})
