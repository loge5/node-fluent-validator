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

function expectThrows (fn, notThrow, key) {
  if (notThrow.indexOf(key) >= 0) {
    expect(fn).not.toThrow()
  } else {
    expect(fn).toThrow()
  }
}

describe('FluentValidator', () => {
  it('should be defined', () => {
    expect(typeof FluentValidator).toBe('function')
  })
  it('createError should set name to error message', () => {
    expect(new FluentValidator(undefined).createError('test').message).toBe('test')
    expect(new FluentValidator(undefined, 'name').createError('test').message).toBe('name test')
  })
  it('isArray should throw Error', () => {
    const notThrow = [
      'arrayEmpty',
      'arrayInteger',
      'arrayString'
    ]
    for (const key of Object.keys(testData)) {
      expectThrows(() => new FluentValidator(testData[key]).isArray(), notThrow, key)
    }
  })
  it('isBoolean should throw Error', () => {
    const notThrow = [
      'booleanTrue',
      'booleanFalse'
    ]
    for (const key of Object.keys(testData)) {
      expectThrows(() => new FluentValidator(testData[key]).isBoolean(), notThrow, key)
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
      expectThrows(() => new FluentValidator(testData[key]).matchRegExp(/[A-z]{3}/), notThrow, key)
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
      expectThrows(() => new FluentValidator(testData[key]).isString(), notThrow, key)
    }
  })
  it('isEmail should throw Error', () => {
    const notThrow = [
      'stringEmail'
    ]
    for (const key of Object.keys(testData)) {
      expectThrows(() => new FluentValidator(testData[key]).isEmail(), notThrow, key)
    }
  })
  it('isSymbol should throw Error', () => {
    const notThrow = [
      'symbol'
    ]
    for (const key of Object.keys(testData)) {
      expectThrows(() => new FluentValidator(testData[key]).isSymbol(), notThrow, key)
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
      expectThrows(() => new FluentValidator(testData[key]).isNumber(), notThrow, key)
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
      expectThrows(() => new FluentValidator(testData[key]).isNumeric(), notThrow, key)
    }
  })
  it('isDefined should throw Error', () => {
    const toThrow = [
      'undefined',
      'null'
    ]
    for (const key of Object.keys(testData)) {
      if (toThrow.indexOf(key) >= 0) {
        expect(() => new FluentValidator(testData[key]).isDefined()).toThrow()
      } else {
        expect(() => new FluentValidator(testData[key]).isDefined()).not.toThrow()
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
      if (toThrow.indexOf(key) >= 0) {
        expect(() => new FluentValidator(testData[key]).isNotEmpty()).toThrow()
      } else {
        expect(() => new FluentValidator(testData[key]).isNotEmpty()).not.toThrow()
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
      expectThrows(() => new FluentValidator(testData[key]).isOneOf(acceptedValues), notThrow, key)
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
      expectThrows(() => new FluentValidator(testData[key]).hasMinimumLength(2), notThrow, key)
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
      expectThrows(() => new FluentValidator(testData[key]).hasMaximumLength(3), notThrow, key)
    }
  })
  it('hasLength should throw Error', () => {
    const notThrow = [
      'stringAlpha',
      'stringNumeric',
      'arrayString'
    ]
    for (const key of Object.keys(testData)) {
      expectThrows(() => new FluentValidator(testData[key]).hasLength(3), notThrow, key)
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
      expectThrows(() => new FluentValidator(testData[key]).toInteger(), notThrow, key)
    }
    expect(new FluentValidator(1337).toInteger()).toBe(1337)
    expect(new FluentValidator('1337').toInteger()).toBe(1337)
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
      expectThrows(() => new FluentValidator(testData[key]).toFloat(), notThrow, key)
    }
    expect(new FluentValidator(1337.12).toFloat()).toBe(1337.12)
    expect(new FluentValidator('1337.12').toFloat()).toBe(1337.12)
  })
})
