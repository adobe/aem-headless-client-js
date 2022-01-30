const { ErrorWrapper, createUpdater } = require('@adobe/aio-lib-core-errors').AioCoreSDKErrorWrapper

const codes = {}
const messages = new Map()

/**
 * Create an Updater for the Error wrapper
 *
 * @ignore
 */
const Updater = createUpdater(
  // object that stores the error classes (to be exported)
  codes,
  // Map that stores the error strings (to be exported)
  messages
)

/**
 * Provides a wrapper to easily create classes of a certain name, and values
 *
 * @ignore
 */
const E = ErrorWrapper(
  // The class name for your SDK Error. Your Error objects will be these objects
  'AEMHeadlessError',
  // The name of your SDK. This will be a property in your Error objects
  'AEMHeadless',
  // the object returned from the CreateUpdater call above
  Updater
  // the base class that your Error class is extending. AioCoreSDKError is the default
  /* , AioCoreSDKError */
)

module.exports = {
  codes,
  messages
}

// Commons errors
E('REQUEST_ERROR', 'General Request error: %s.')
E('RESPONSE_ERROR', 'There was a problem parsing response data: %s.')
E('API_ERROR', 'There was a problem with your API call: %s.')
E('INVALID_PARAM', 'There was a problem with required params: %s.')
// NodeJS Errors
E('AUTH_FILE_READ_ERROR', 'There was a problem reading auth file: %s.')
E('AUTH_FILE_PARSE_ERROR', 'There was a problem parsing auth file: %s.')
E('EXCHANGE_TOKEN_ERROR', 'There was a problem fetching  exchange token: %s.')
