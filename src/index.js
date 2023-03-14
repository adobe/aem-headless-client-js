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

const ErrorCodes = require('./utils/SDKErrors').codes
const { AEM_GRAPHQL_ACTIONS, AEM_GRAPHQL_TYPES } = require('./utils/config')
const { graphQLQueryBuilder, getQueryType } = require('./utils/GraphQLQueryBuilder')
const { REQUEST_ERROR, RESPONSE_ERROR, API_ERROR, INVALID_PARAM } = ErrorCodes

/**
 * This class provides methods to call AEM GraphQL APIs.
 * Before calling any method initialize the instance
 * with GraphQL endpoint, GraphQL serviceURL and auth if needed
 */
class AEMHeadless {
  /**
   * Constructor.
   *
   * If param is a string, it's treated as AEM server URL, default GraphQL endpoint is used.
   * For granular params, use config object
   *
   * @param {string|object} config - Configuration object, or AEM server URL string
   * @param {string} [config.serviceURL] - AEM server URL
   * @param {string} [config.endpoint] - GraphQL endpoint
   * @param {(string|Array)} [config.auth] - Bearer token string or [user,pass] pair array
   * @param {object} [config.headers] - header { name: value, name: value, ... }
   * @param {object} [config.fetch] - custom Fetch instance
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
      this.headers = config.headers
    }

    this.serviceURL = this.__getDomain(serviceURL)
    this.endpoint = this.__getPath(endpoint)
    this.fetch = this.__getFetch(config.fetch)
    this.hasNext = true
    this.endCursor = ''
    this.offset = 0
  }

  buildQuery (model, itemQuery, args) {
    return graphQLQueryBuilder(model, itemQuery, args)
  }

  __getPagingArgs (args, index) {
    const queryType = getQueryType(args)
    let pagingArgs = args

    if (queryType === AEM_GRAPHQL_TYPES.LIST) {
      this.offset = index !== 0 ? this.offset + (args.limit || 10) : (args.offset || 0)
      pagingArgs = { ...args, offset: this.offset }
    }

    if (queryType === AEM_GRAPHQL_TYPES.PAGINATED) {
      pagingArgs = this.endCursor ? { ...args, after: this.endCursor } : args
    }

    return pagingArgs
  }

  /**
   * Returns a Generator Function.
   *
   * @generator
   * @param {string} model - contentFragment model name
   * @param {string} fields - query string for item fields
   * @param {object} [args={}] - paginated query arguments
   * @param {object} [options={}] - additional POST request options
   * @param {object} [retryOptions={}] - retry options for @adobe/aio-lib-core-networking
   * @yields {null | Promise<object | Array>} - the response items wrapped inside a Promise
   */
  async * initPaginatedQuery (model, fields, args = {}, options, retryOptions) {
    if (!model || !fields) {
      throw new INVALID_PARAM({
        sdkDetails: {
          serviceURL: this.serviceURL
        },
        messageValues: 'Required param missing: @param {string} fields - query string for item fields'
      })
    }

    let i = 0
    while (this.hasNext) {
      const pagingArgs = this.__getPagingArgs(args, i)
      i += 1
      const { query, type } = this.buildQuery(model, fields, pagingArgs)
      const { data } = await this.runQuery(query, options, retryOptions)

      if (!data || (data && data.length === 0)) {
        this.hasNext = false
        this.endCursor = ''
        this.offset = 0
        return data
      }
      let filteredData
      try {
        filteredData = this.__filterData(model, type, data)
      } catch (e) {
        throw new API_ERROR({
          sdkDetails: {
            serviceURL: this.serviceURL
          },
          messageValues: `Error while filtering response data. ${e.message}`
        })
      }

      if (!filteredData || filteredData.length === 0 || type === AEM_GRAPHQL_TYPES.BY_PATH) {
        this.hasNext = false
        this.endCursor = ''
        this.offset = 0
        return filteredData
      }

      if (type === AEM_GRAPHQL_TYPES.LIST && filteredData.length < (args.limit || 10)) {
        return filteredData
      }

      if (type === AEM_GRAPHQL_TYPES.PAGINATED && filteredData.length < (args.first || 10)) {
        return filteredData
      }

      yield filteredData
    }
  }

  __filterData (model, type, data) {
    let response
    switch (type) {
      case AEM_GRAPHQL_TYPES.BY_PATH:
        return data[`${model}${type}`].item
      case AEM_GRAPHQL_TYPES.PAGINATED:
        response = data[`${model}${type}`]
        this.hasNext = response.pageInfo.hasNextPage
        this.endCursor = response.pageInfo.endCursor
        return response.edges.map(item => item.node)
      default:
        return data[`${model}${type}`].items
    }
  }

  /**
   * Returns a Promise that resolves with a POST request JSON data.
   *
   * @param {string|object} body - the query string or an object with query (and optionally variables) as a property
   * @param {object} [options={}] - additional POST request options
   * @param {object} [retryOptions={}] - retry options for @adobe/aio-lib-core-networking
   * @returns {Promise<any>} - the response body wrapped inside a Promise
   */
  async runQuery (body, options = {}, retryOptions = {}) {
    const postBody = typeof body === 'object' ? body : { query: body }
    return this.__handleRequest(this.endpoint, JSON.stringify(postBody), options, retryOptions)
  }

  /**
   * Returns a Promise that resolves with a PUT request JSON data.
   *
   * @param {string} query - the query string
   * @param {string} path - AEM path to save query, format: configuration_name/endpoint_name
   * @param {object} [options={}] - additional PUT request options
   * @param {object} [retryOptions={}] - retry options for @adobe/aio-lib-core-networking
   * @returns {Promise<any>} - the response body wrapped inside a Promise
   */
  async persistQuery (query, path, options = {}, retryOptions = {}) {
    const url = `${AEM_GRAPHQL_ACTIONS.persist}/${path}`
    return this.__handleRequest(url, query, { method: 'PUT', ...options }, retryOptions)
  }

  /**
   * Returns a Promise that resolves with a GET request JSON data.
   *
   * @param {object} [options={}] - additional GET request options
   * @param {object} [retryOptions={}] - retry options for @adobe/aio-lib-core-networking
   * @returns {Promise<any>} - the response body wrapped inside a Promise
   */
  async listPersistedQueries (options = {}, retryOptions = {}) {
    const url = `${AEM_GRAPHQL_ACTIONS.list}`
    return this.__handleRequest(url, '', { method: 'GET', ...options }, retryOptions)
  }

  /**
   * Returns a Promise that resolves with a GET request JSON data.
   *
   * @param {string} path - AEM path for persisted query, format: configuration_name/endpoint_name
   * @param {object} [variables={}] - query variables
   * @param {object} [options={}] - additional GET request options
   * @param {object} [retryOptions={}] - retry options for @adobe/aio-lib-core-networking
   * @returns {Promise<any>} - the response body wrapped inside a Promise
   */

  async runPersistedQuery (path, variables = {}, options = {}, retryOptions = {}) {
    const method = (options.method || 'GET').toUpperCase()
    let body = ''
    let variablesString = encodeURIComponent(Object.keys(variables).map(key => `;${key}=${(variables[key])}`).join(''))

    if (method === 'POST') {
      body = JSON.stringify({ variables })
      variablesString = ''
    }

    const url = `${AEM_GRAPHQL_ACTIONS.execute}/${path}${variablesString}`
    return this.__handleRequest(url, body, { method, ...options }, retryOptions)
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
      authToken = this.__str2base64(`${auth[0]}:${auth[1]}`)
    }

    return `${authType} ${authToken}`
  }

  /**
   * simple string to base64 implementation
   *
   * @private
   * @param {string} str
   */
  __str2base64 (str) {
    try {
      return btoa(str)
    } catch (err) {
      return Buffer.from(str, 'utf8').toString('base64')
    }
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

    if (this.headers) {
      requestOptions.headers = {
        ...this.headers,
        ...requestOptions.headers
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
   * @param {object} [retryOptions={}] - retry options for @adobe/aio-lib-core-networking
   * @returns {Promise<any>} the response body wrapped inside a Promise
   */
  async __handleRequest (endpoint, body, options, retryOptions) {
    const requestOptions = this.__getRequestOptions(body, options)
    const url = this.__getUrl(this.serviceURL, endpoint)
    this.__validateUrl(url)

    let response
    // 1. Handle Request
    try {
      response = await this.fetch(url, requestOptions, retryOptions)
    } catch (error) {
      // 1.1 Request error: general
      throw new REQUEST_ERROR({
        sdkDetails: {
          serviceURL: this.serviceURL,
          endpoint
        },
        messageValues: error.message
      })
    }
    let apiError
    // 2. Handle Response error
    if (!response.ok) {
      try {
        // 2.1 Check if custom error is returned
        apiError = await response.json()
      } catch (error) {
        // 2.3 Response error: Couldn't parse JSON - no error defined in API response
        throw new RESPONSE_ERROR({
          sdkDetails: {
            serviceURL: this.serviceURL,
            endpoint
          },
          messageValues: error.message
        })
      }
    }

    if (apiError) {
      // 2.2 Response error: JSON parsed - valid error defined in API response
      throw new API_ERROR({
        sdkDetails: {
          serviceURL: this.serviceURL,
          endpoint
        },
        messageValues: apiError
      })
    }
    // 3. Handle ok response
    let data
    try {
      data = await response.json()
    } catch (error) {
      // 3.2. Response ok: Data error - Couldn't parse the JSON from OK response
      throw new RESPONSE_ERROR({
        sdkDetails: {
          serviceURL: this.serviceURL,
          endpoint
        },
        messageValues: error.message
      })
    }
    // 3.2. Response ok: containing errors info
    if (data && data.errors) {
      throw new RESPONSE_ERROR({
        sdkDetails: {
          serviceURL: this.serviceURL,
          endpoint
        },
        messageValues: data.errors.map((error) => error.message).join('. ')
      })
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
        throw new INVALID_PARAM({
          sdkDetails: {
            serviceURL: this.serviceURL
          },
          messageValues: 'Required param missing: config.fetch'
        })
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
    if (typeof window !== 'undefined') {
      return window.fetch.bind(window)
    }

    if (typeof self !== 'undefined') {
      return self.fetch.bind(self) // eslint-disable-line
    }

    return null
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
      throw new INVALID_PARAM({
        sdkDetails: {
          serviceURL: this.serviceURL
        },
        messageValues: `Invalid URL/path: ${url}`
      })
    }
  }
}

module.exports = AEMHeadless
module.exports.AEMHeadless = AEMHeadless
module.exports.ErrorCodes = ErrorCodes
