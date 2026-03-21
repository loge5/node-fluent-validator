const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const FluentValidator = require('./FluentValidator')

const testData = {
  booleanTrue: true,
  booleanFalse: false,
  null: null,
  undefined,
  integerNegative: -1,
  integerZero: 0,
  integerPositive: 1,
  floatNegative: -0.1,
  floatPositive: 0.1,
  stringEmpty: '',
  stringAlpha: 'abc',
  stringNumeric: '123',
  stringAlphaNumeric: '123abc',
  stringEmail: 'test@test.de',
  stringEmailInvalid: 'test@test',
  object: {},
  arrayEmpty: [],
  arrayInteger: [1, 2, 3, 4],
  arrayString: ['a', 'b', 'c'],
  symbol: Symbol('test')
}

describe('FluentValidator', () => {
  it('should be defined', () => {
    expect(FluentValidator).to.be.a('function')
  })
  it('createError should set name to error message', () => {
    expect(new FluentValidator(undefined).createError('test').message).equals('test')
    expect(new FluentValidator(undefined, 'name').createError('test').message).equals('name test')
  })
  it('isArray should throw Error', () => {
    const notThrow = [
      'arrayEmpty',
      'arrayInteger',
      'arrayString'
    ]
    for (const key of Object.keys(testData)) {
      const e = expect(() => new FluentValidator(testData[key]).isArray(), key)
      if (notThrow.indexOf(key) >= 0) {
        e.to.not.throw(Error)
      } else {
        e.to.throw(Error)
      }
    }
  })
  it('isBoolean should throw Error', () => {
    const notThrow = [
      'booleanTrue',
      'booleanFalse'
    ]
    for (const key of Object.keys(testData)) {
      const e = expect(() => new FluentValidator(testData[key]).isBoolean(), key)
      if (notThrow.indexOf(key) >= 0) {
        e.to.not.throw(Error)
      } else {
        e.to.throw(Error)
      }
    }
  })
  it('isString should throw Error', () => {
    const notThrow = [
      'stringAlpha',
      'stringAlphaNumeric',
      'stringEmail',
      'stringEmailInvalid'
    ]
    for (const key of Object.keys(testData)) {
      const e = expect(() => new FluentValidator(testData[key]).matchRegExp(/[A-z]{3}/), key)
      if (notThrow.indexOf(key) >= 0) {
        e.to.not.throw(Error)
      } else {
        e.to.throw(Error)
      }
    }
  })
  it('matchRegExp should throw Error', () => {
    const notThrow = [
      'stringEmpty',
      'stringAlpha',
      'stringNumeric',
      'stringAlphaNumeric',
      'stringEmail',
      'stringEmailInvalid'
    ]
    for (const key of Object.keys(testData)) {
      const e = expect(() => new FluentValidator(testData[key]).isString(), key)
      if (notThrow.indexOf(key) >= 0) {
        e.to.not.throw(Error)
      } else {
        e.to.throw(Error)
      }
    }
  })
  it('isEmail should throw Error', () => {
    const notThrow = [
      'stringEmail'
    ]
    for (const key of Object.keys(testData)) {
      const e = expect(() => new FluentValidator(testData[key]).isEmail(), key)
      if (notThrow.indexOf(key) >= 0) {
        e.to.not.throw(Error)
      } else {
        e.to.throw(Error)
      }
    }
  })
  it('isSymbol should throw Error', () => {
    const notThrow = [
      'symbol'
    ]
    for (const key of Object.keys(testData)) {
      const e = expect(() => new FluentValidator(testData[key]).isSymbol(), key)
      if (notThrow.indexOf(key) >= 0) {
        e.to.not.throw(Error)
      } else {
        e.to.throw(Error)
      }
    }
  })
  it('isNumber should throw Error', () => {
    const notThrow = [
      'integerNegative',
      'integerZero',
      'integerPositive',
      'floatNegative',
      'floatPositive'
    ]
    for (const key of Object.keys(testData)) {
      const e = expect(() => new FluentValidator(testData[key]).isNumber(), key)
      if (notThrow.indexOf(key) >= 0) {
        e.to.not.throw(Error)
      } else {
        e.to.throw(Error)
      }
    }
  })
  it('isNumeric should throw Error', () => {
    const notThrow = [
      'integerNegative',
      'integerZero',
      'integerPositive',
      'floatNegative',
      'floatPositive',
      'stringNumeric'
    ]
    for (const key of Object.keys(testData)) {
      const e = expect(() => new FluentValidator(testData[key]).isNumeric(), key)
      if (notThrow.indexOf(key) >= 0) {
        e.to.not.throw(Error)
      } else {
        e.to.throw(Error)
      }
    }
  })
  it('isDefined should throw Error', () => {
    const toThrow = [
      'undefined',
      'null'
    ]
    for (const key of Object.keys(testData)) {
      const e = expect(() => new FluentValidator(testData[key]).isDefined(), key)
      if (toThrow.indexOf(key) >= 0) {
        e.to.throw(Error)
      } else {
        e.to.not.throw(Error)
      }
    }
  })
  it('isNotEmpty should throw Error', () => {
    const toThrow = [
      'undefined',
      'stringEmpty',
      'arrayEmpty'
    ]
    for (const key of Object.keys(testData)) {
      const e = expect(() => new FluentValidator(testData[key]).isNotEmpty(), key)
      if (toThrow.indexOf(key) >= 0) {
        e.to.throw(Error)
      } else {
        e.to.not.throw(Error)
      }
    }
  })
  it('isOneOf should throw Error', () => {
    const acceptedValues = [
      false,
      '123abc',
      -1,
      0.1
    ]
    const notThrow = [
      'booleanFalse',
      'stringAlphaNumeric',
      'integerNegative',
      'floatPositive'
    ]
    for (const key of Object.keys(testData)) {
      const e = expect(() => new FluentValidator(testData[key]).isOneOf(acceptedValues), key)
      if (notThrow.indexOf(key) >= 0) {
        e.to.not.throw(Error)
      } else {
        e.to.throw(Error)
      }
    }
  })
  it('hasMinimumLength should throw Error', () => {
    const notThrow = [
      'stringAlpha',
      'stringNumeric',
      'stringAlphaNumeric',
      'stringEmail',
      'stringEmailInvalid',
      'arrayInteger',
      'arrayString'
    ]
    for (const key of Object.keys(testData)) {
      const e = expect(() => new FluentValidator(testData[key]).hasMinimumLength(2), key)
      if (notThrow.indexOf(key) >= 0) {
        e.to.not.throw(Error)
      } else {
        e.to.throw(Error)
      }
    }
  })
  it('hasMaximumLength should throw Error', () => {
    const notThrow = [
      'stringEmpty',
      'stringAlpha',
      'stringNumeric',
      'arrayEmpty',
      'arrayString'
    ]
    for (const key of Object.keys(testData)) {
      const e = expect(() => new FluentValidator(testData[key]).hasMaximumLength(3), key)
      if (notThrow.indexOf(key) >= 0) {
        e.to.not.throw(Error)
      } else {
        e.to.throw(Error)
      }
    }
  })
  it('hasLength should throw Error', () => {
    const notThrow = [
      'stringAlpha',
      'stringNumeric',
      'arrayString'
    ]
    for (const key of Object.keys(testData)) {
      const e = expect(() => new FluentValidator(testData[key]).hasLength(3), key)
      if (notThrow.indexOf(key) >= 0) {
        e.to.not.throw(Error)
      } else {
        e.to.throw(Error)
      }
    }
  })
  it('toInteger should return integer', () => {
    const notThrow = [
      'integerNegative',
      'integerZero',
      'integerPositive',
      'floatNegative',
      'floatPositive',
      'stringNumeric'
    ]
    for (const key of Object.keys(testData)) {
      const e = expect(() => new FluentValidator(testData[key]).toInteger(), key)
      if (notThrow.indexOf(key) >= 0) {
        e.to.not.throw(Error)
      } else {
        e.to.throw(Error)
      }
    }
    expect(new FluentValidator(1337).toInteger()).equal(1337)
    expect(new FluentValidator('1337').toInteger()).equal(1337)
  })
  it('toFloat should return float', () => {
    const notThrow = [
      'integerNegative',
      'integerZero',
      'integerPositive',
      'floatNegative',
      'floatPositive',
      'stringNumeric'
    ]
    for (const key of Object.keys(testData)) {
      const e = expect(() => new FluentValidator(testData[key]).toFloat(), key)
      if (notThrow.indexOf(key) >= 0) {
        e.to.not.throw(Error)
      } else {
        e.to.throw(Error)
      }
    }
    expect(new FluentValidator(1337.12).toFloat()).equal(1337.12)
    expect(new FluentValidator('1337.12').toFloat()).equal(1337.12)
  })
})
