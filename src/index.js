/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { SDKError, SDKErrorWrapper } = require('./utils/errors')
const { AEM_GRAPHQL_ACTIONS } = require('./utils/config')

/**
 * This class provides methods to call AEM GraphQL APIs.
 * Before calling any method initialize the instance
 * with GraphQL endpoint, GraphQL host and auth if needed
 */
class AEMHeadless {
  /**
   * Constructor.
   * If param is a string, it's treated as AEM server URL, default GraphQL endpoint is used.
   * For granular params, use config object
   *
   * @param {object|string} config Configuration object, or AEM server URL string
   * @param {string} [config.serviceURL] AEM server URL
   * @param {string} [config.endpoint] GraphQL endpoint
   * @param {string|Array} [config.auth] Bearer token string or [user,pass] pair array
   * @param {object} [config.fetch] Fetch instance - for NodeJS only, eg node-fetch/cross-fetch
   */
  constructor (config) {
    let endpoint = AEM_GRAPHQL_ACTIONS.endpoint
    let serviceURL = AEM_GRAPHQL_ACTIONS.serviceURL

    if (typeof config === 'string') {
      serviceURL = config
    } else {
      serviceURL = config.serviceURL || serviceURL
      endpoint = config.endpoint || endpoint
      this.auth = config.auth
    }

    this.serviceURL = this.__getDomain(serviceURL)
    this.endpoint = this.__getPath(endpoint)
    this.fetch = this.__getFetch(config.fetch)
  }

  /**
   * Returns a Promise that resolves with a POST request JSON data.
   *
   * @param {string} query - the query string
   * @param {object} [options={}] - additional POST request options
   * @returns {Promise<any>} - the response body wrapped inside a Promise
   */
  runQuery (query, options = {}) {
    return this.__handleRequest(this.endpoint, JSON.stringify({ query }), options)
  }

  /**
   * Returns a Promise that resolves with a PUT request JSON data.
   *
   * @param {string} query - the query string
   * @param {string} path - AEM path to save query, format: configuration_name/endpoint_name
   * @param {object} [options={}] - additional PUT request options
   * @returns {Promise<any>} - the response body wrapped inside a Promise
   */
  persistQuery (query, path, options = {}) {
    const url = `${AEM_GRAPHQL_ACTIONS.persist}/${path}`
    return this.__handleRequest(url, query, { method: 'PUT', ...options })
  }

  /**
   * Returns a Promise that resolves with a GET request JSON data.
   *
   * @param {object} [options={}] - additional GET request options
   * @returns {Promise<any>} - the response body wrapped inside a Promise
   */
  listPersistedQueries (options = {}) {
    const url = `${AEM_GRAPHQL_ACTIONS.list}`
    return this.__handleRequest(url, '', { method: 'GET', ...options })
  }

  /**
   * Returns a Promise that resolves with a GET request JSON data.
   *
   * @param {string} path - AEM path for persisted query, format: configuration_name/endpoint_name
   * @param {object} [options={}] - additional GET request options
   * @returns {Promise<any>} - the response body wrapped inside a Promise
   */
  runPersistedQuery (path, options = {}) {
    const url = `${AEM_GRAPHQL_ACTIONS.execute}/${path}`
    return this.__handleRequest(url, '', { method: 'GET', ...options })
  }

  /**
   * Returns Authorization Header value.
   *
   * @private
   * @param {string|array} auth - Bearer token string or [user,pass] pair array
   * @returns {string} Authorization Header value
   */
  __getAuthHeader (auth) {
    let authType = 'Bearer'
    let authToken = auth
    // If auth is user, pass pair
    if (Array.isArray(auth) && auth[0] && auth[1]) {
      authType = 'Basic'
      authToken = Buffer.from(`${auth[0]}:${auth[1]}`, 'utf8').toString('base64')
    }

    return `${authType} ${authToken}`
  }

  /**
   * Returns an object for Request options
   *
   * @private
   * @param {string} [body] - Request body (the query string)
   * @param {object} [options] Additional Request options
   * @returns {object} the Request options object
   */
  __getRequestOptions (body, options) {
    const { method = 'POST' } = options

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (this.auth) {
      requestOptions.headers = {
        ...requestOptions.headers,
        Authorization: this.__getAuthHeader(this.auth)
      }
      requestOptions.credentials = 'include'
    }

    return {
      method,
      ...body ? { body } : {},
      ...requestOptions,
      ...options
    }
  }

  /**
   * Returns a Promise that resolves with a PUT request JSON data.
   *
   * @private
   * @param {string} endpoint - Request endpoint
   * @param {string} [body=''] - Request body (the query string)
   * @param {object} [options={}] - Request options
   * @returns {Promise<any>} the response body wrapped inside a Promise
   */
  async __handleRequest (endpoint, body, options) {
    const requestOptions = this.__getRequestOptions(body, options)
    const url = this.__getUrl(this.serviceURL, endpoint)
    this.__validateUrl(url)

    let response
    // 1. Handle Request
    try {
      response = await this.fetch(url, requestOptions)
    } catch (error) {
      // 1.1 Request error: general
      throw SDKErrorWrapper(error, 'RequestError', '')
    }
    let apiError
    // 2. Handle Response error
    if (!response.ok) {
      try {
        // 2.1 Check if custom error is returned
        apiError = await response.json()
      } catch (error) {
        // 2.3 Response error: Couldn't parse JSON - no error defined in API response
        throw SDKErrorWrapper(error, 'ResponseError', response.status)
      }
    }

    if (apiError) {
      // 2.2 Response error: JSON parsed - valid error defined in API response
      const { name, errorType, type, message, details } = apiError.error || (apiError.errors ? apiError.errors[0] : {})
      throw new SDKError(errorType || name, type || 'APIError', response.status, message, details)
    }
    // 3. Handle ok response
    let data
    try {
      data = await response.json()
    } catch (error) {
      // 3.2. Response ok: Data error - Couldn't parse the JSON from OK response
      throw SDKErrorWrapper(error, 'ResponseDataError', response.status)
    }

    return data
  }

  /**
   * Returns valid url.
   *
   * @private
   * @param {string} domain
   * @param {string} path
   * @returns {string} valid url
   */
  __getUrl (domain, path) {
    return `${domain}${path}`
  }

  /**
   * Removes first / in a path
   *
   * @private
   * @param {string} path
   * @returns {string} path
   */
  __getPath (path) {
    return path[0] === '/' ? path.substring(1) : path
  }

  /**
   * Add last / in domain
   *
   * @private
   * @param {string} domain
   * @returns {string} valid domain
   */
  __getDomain (domain) {
    return domain[domain.length - 1] === '/' ? domain : `${domain}/`
  }

  /**
   * get Fetch instance
   *
   * @private
   * @param {object} [fetch]
   * @returns {object} fetch instance
   */
  __getFetch (fetch) {
    if (!fetch) {
      const browserFetch = this.__getBrowserFetch()
      if (!browserFetch) {
        throw new SDKError('InvalidParameter', 'SDKError', '', 'Required param missing: config.fetch')
      }

      return browserFetch
    }

    return fetch
  }

  /**
   * get Browser Fetch instance
   *
   * @private
   * @returns {object} fetch instance
   */
  __getBrowserFetch () {
    const top =
      (typeof window !== 'undefined' && window) ||
      (typeof self !== 'undefined' && self) || // eslint-disable-line
      {}

    return top.fetch
  }

  /**
   * Check valid url or absolute path
   *
   * @private
   * @param {string} url
   * @returns void
   */
  __validateUrl (url) {
    const fullUrl = url[0] === '/' ? `https://domain${url}` : url

    try {
      new URL(fullUrl) // eslint-disable-line
    } catch (e) {
      throw new SDKError('InvalidParameter', 'SDKError', '', `Invalid URL/path: ${url}`)
    }
  }
}

module.exports = AEMHeadless
