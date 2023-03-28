const { INVALID_PARAM } = require('./SDKErrors').codes

/**
 * simple string to base64 implementation
 *
 * @private
 * @param {string} str
 */
const __str2base64 = (str) => {
  if (typeof btoa === 'function') {
    return btoa(str)
  } else {
    return Buffer.from(str, 'utf8').toString('base64')
  }
}

/**
 * Returns valid url.
 *
 * @private
 * @param {string} domain
 * @param {string} path
 * @returns {string} valid url
 */
const __getUrl = (domain, path) => {
  return `${domain}${path}`
}

/**
 * Removes first / in a path
 *
 * @private
 * @param {string} path
 * @returns {string} path
 */
const __getPath = (path) => {
  return path[0] === '/' ? path.substring(1) : path
}

/**
 * Add last / in domain
 *
 * @private
 * @param {string} domain
 * @returns {string} valid domain
 */
const __getDomain = (domain) => {
  return domain[domain.length - 1] === '/' ? domain : `${domain}/`
}

/**
 * Check valid url or absolute path
 *
 * @private
 * @param {string} url
 * @returns void
 */
const __validateUrl = (url) => {
  const fullUrl = url[0] === '/' ? `https://domain${url}` : url

  try {
    new URL(fullUrl) // eslint-disable-line
  } catch (e) {
    throw new INVALID_PARAM({
      messageValues: `Invalid URL/path: ${url}`
    })
  }
}

/**
 * get Browser Fetch instance
 *
 * @private
 * @returns {object} fetch instance
 */
const __getBrowserFetch = () => {
  if (typeof window !== 'undefined') {
    return window.fetch.bind(window)
  }

  if (typeof self !== 'undefined') {
    return self.fetch.bind(self) // eslint-disable-line
  }

  return null
}

/**
 * get Fetch instance
 *
 * @private
 * @param {object} [fetch]
 * @returns {object} fetch instance
 */
const __getFetch = (fetch) => {
  if (!fetch) {
    const browserFetch = __getBrowserFetch()
    if (!browserFetch) {
      throw new INVALID_PARAM({
        messageValues: 'Required param missing: config.fetch'
      })
    }

    return browserFetch
  }

  return fetch
}

/**
 * Returns Authorization Header value.
 *
 * @private
 * @param {string|array} auth - Bearer token string or [user,pass] pair array
 * @returns {string} Authorization Header value
 */
const __getAuthHeader = (auth) => {
  let authType = 'Bearer'
  let authToken = auth
  // If auth is user, password` pair
  if (Array.isArray(auth) && auth[0] && auth[1]) {
    authType = 'Basic'
    authToken = __str2base64(`${auth[0]}:${auth[1]}`)
  }

  return `${authType} ${authToken}`
}

module.exports = {
  __getUrl,
  __getPath,
  __getDomain,
  __validateUrl,
  __getFetch,
  __getAuthHeader
}
