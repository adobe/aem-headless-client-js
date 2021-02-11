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

const fetch = require('cross-fetch')
const { SDKError, SDKErrorWrapper } = require('./utils/errors')
const {
  AEM_GRAPHQL_ACTIONS,
  AEM_AUTHORIZATION,
  AEM_HOST_URI
} = require('./utils/config')

/**
 * This class provides methods to call AEM GraphQL APIs.
 * Before calling any method initialize the instance
 * with GraphQL endpoint, GraphQL host and auth if needed
 */
class AEMHeadless {
  /**
   * Constructor.
   *
   *
   * @param {string} endpoint GraphQL endpoint
   * @param {string} [host=env.AEM_HOST_URI] GraphQL host
   * @param {string|Array} [auth=''] Bearer token string or [user,pass] pair array. If not defined env variables are checked: env.AEM_TOKEN || env.AEM_USER && env.AEM_PASS
   */
  constructor (endpoint = AEM_GRAPHQL_ACTIONS.endpoint, host = AEM_HOST_URI, auth = AEM_AUTHORIZATION) {
    this.endpoint = endpoint
    this.host = host
    this.token = this.__getToken(auth)
    this.authType = Array.isArray(auth) ? 'Basic' : 'Bearer'
  }

  /**
   * Returns a Promise that resolves with a POST request JSON data.
   *
   * @param {string} query - the query string
   * @param {object} [options={}] - additional POST request options
   * @returns {Promise<any>} - the response body wrapped inside a Promise
   */
  postQuery (query, options = {}) {
    return this.__handleRequest(this.endpoint, JSON.stringify({ query }), options)
  }

  /**
   * Returns a Promise that resolves with a PUT request JSON data.
   *
   * @param {string} query - the query string
   * @param {string} endpoint - AEM path to save query, format: configuration_name/endpoint_name
   * @param {object} [options={}] - additional PUT request options
   * @returns {Promise<any>} - the response body wrapped inside a Promise
   */
  saveQuery (query, endpoint, options = {}) {
    const url = `${AEM_GRAPHQL_ACTIONS.persist}/${endpoint}`
    return this.__handleRequest(url, query, { method: 'PUT', ...options })
  }

  /**
   * Returns a Promise that resolves with a GET request JSON data.
   *
   * @param {object} [options={}] - additional GET request options
   * @returns {Promise<any>} - the response body wrapped inside a Promise
   */
  listQueries (options = {}) {
    const url = `${AEM_GRAPHQL_ACTIONS.list}`
    return this.__handleRequest(url, '', { method: 'GET', ...options })
  }

  /**
   * Returns a Promise that resolves with a GET request JSON data.
   *
   * @param {string} endpoint - AEM path for persisted query, format: configuration_name/endpoint_name
   * @param {object} [options={}] - additional GET request options
   * @returns {Promise<any>} - the response body wrapped inside a Promise
   */
  getQuery (endpoint, options = {}) {
    const url = `${AEM_GRAPHQL_ACTIONS.execute}/${endpoint}`
    return this.__handleRequest(url, '', { method: 'GET', ...options })
  }

  /**
   * Returns token for Authorization.
   *
   * @private
   * @param {string|array} auth - Bearer token string or [user,pass] pair array
   * @returns {string} token for auth
   */
  __getToken (auth) {
    if (!auth) {
      return ''
    }
    // If auth is user, pass pair
    if (Array.isArray(auth) && auth[0] && auth[1]) {
      return Buffer.from(`${auth[0]}:${auth[1]}`, 'utf8').toString('base64')
    }

    return auth
  }

  /**
   * Returns valid url or path.
   *
   * @private
   * @param {string} path
   * @returns {string} valid url
   */
  __getUrl (path) {
    let url = {}
    try {
      url = new URL(path)
    } catch (e) {}

    if (url.hostname) {
      return url
    }

    const absPath = path[0] === '/' ? path : `/${path}`

    if (!this.host) {
      return absPath
    }

    return `${this.host}${absPath}`
  }

  /**
   * Returns an object for Request options
   *
   * @private
   * @param {string} [body] - Request body (the query string)
   * @param {object} [options] Additional Request options
   * @returns {object} the Request options object
   */
  __getRequestOptions (body = '', options = {}) {
    const { method = 'POST' } = options

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (this.token) {
      requestOptions.headers = {
        ...requestOptions.headers,
        Authorization: `${this.authType} ${this.token}`
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
  async __handleRequest (endpoint, body = '', options = {}) {
    const requestOptions = this.__getRequestOptions(body, options)
    const url = this.__getUrl(endpoint)

    let response
    // 1. Handle Request
    try {
      response = await fetch(url, requestOptions)
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
      throw SDKErrorWrapper(error, 'ResponseError', response.status)
    }

    return data
  }
}

module.exports = AEMHeadless
