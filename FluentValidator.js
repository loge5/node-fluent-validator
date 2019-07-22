/**
 * Validator based on an fluent interface
 *
 * Example Usage:
 * let validString = new FluentValidator('test').isString().isNotEmpty().value
 */
class FluentValidator {
  /**
   * @param {*} value
   * @param {string} name for custom error messages
   */
  constructor (value, name) {
    this.value = value
    this.name = name
  }

  /**
   * @returns {FluentValidator}
   */
  isArray () {
    if (typeof this.value !== 'object' || !Array.isArray(this.value)) {
      throw this.createError('should be a array')
    }
    return this
  }

  /**
   * @returns {FluentValidator}
   */
  isString () {
    if (typeof this.value !== 'string') {
      throw this.createError('should be a string')
    }
    return this
  }

  /**
   * null counts as undefined
   * @returns {FluentValidator}
   */
  isDefined () {
    if (typeof this.value === 'undefined') {
      throw this.createError('should be defined')
    }
    if (typeof this.value === 'object' && this.value === null) {
      throw this.createError('should be defined')
    }
    return this
  }

  /**
   * objects and numbers are not checked
   * @returns {FluentValidator}
   */
  isNotEmpty () {
    switch (typeof this.value) {
      case 'undefined':
        throw this.createError('should not be empty')
      case 'string':
        if (this.value.length === 0) {
          throw this.createError('should not be empty')
        }
        break
      default:
        return this
    }
    return this
  }

  /**
   * @param {number} minLength
   * @returns {FluentValidator}
   */
  hasMinimumLength (minLength) {
    if (this.value.length < minLength) {
      throw this.createError('should have minumum length of ' + minLength)
    }
    return this
  }

  /**
   * @param {number} maxLength
   * @returns {FluentValidator}
   */
  hasMaximumLength (maxLength) {
    if (this.value.length > maxLength) {
      throw this.createError('should have maximum length of ' + maxLength)
    }
    return this
  }

  /**
   * @param {number} length
   * @returns {FluentValidator}
   */
  hasLength (length) {
    if (this.value.length !== length) {
      throw this.createError('should have length of ' + length)
    }
    return this
  }

  /**
   * @param {string} msg
   */
  createError (msg) {
    let errorMessage = msg
    if (typeof this.name === 'string') {
      errorMessage = `${this.name}: ${msg}`
    }
    return new Error(errorMessage)
  }
}

module.exports = FluentValidator