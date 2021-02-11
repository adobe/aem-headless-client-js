/**
 * The base class for SDK Errors.
 */
class SDKError extends Error {
  /**
   * Constructor.
   *
   * @param {string} [name=<no_name>] Name for the Error
   * @param {string} [type=<no_type>] type for the Error
   * @param {string} [code=<no_type>] code for the Error
   * @param {string} [message=<no_message>] The message for the Error
   * @param {string} [details=<no_details>] The details associated with the Error
   * @param {boolean} [captureStackTrace=Error.captureStackTrace] if available, capture the V8 stack trace
   */
  constructor (
    name = '',
    type = '',
    code = '',
    message = '',
    details = '',
    captureStackTrace = Error.captureStackTrace
  ) {
    super(message)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (captureStackTrace && captureStackTrace instanceof Function) {
      captureStackTrace(this, SDKError)
    }
    this.name = name || this.constructor.name
    this.message = message || this.constructor.message
    this.type = type || this.constructor.type
    this.code = code || this.constructor.code
    this.details = details || this.constructor.details
  }

  /**
   * Returns a JSON representation of this Error object.
   *
   * @returns {object} Object with error data
   */
  toJSON () {
    return {
      name: this.name,
      type: this.type,
      code: this.code,
      message: this.message,
      details: this.details,
      stacktrace: this.stack
    }
  }
}

const SDKErrorWrapper = (error, errorType, code = '') => {
  const { name, type, message, details } = error
  return new SDKError(name, type || errorType, code, message, details)
}

module.exports = {
  SDKError,
  SDKErrorWrapper
}
