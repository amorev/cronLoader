'use strict'
var expect = require('chai').expect
var index = require('../dist/index.js')
describe('cronMethodTest', () => {
  it('should return Boys', () => {
    var method = index.cronMethod
    expect(method).to.be.an('function')
  })
})
