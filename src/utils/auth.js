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

const fs = require('fs')
const path = require('path')
const exchange = require('@adobe/aemcs-api-client-lib')
const { SDKError } = require('./errors')

/**
 * Returns a Promise that resolves with a credentials JSON data.
 *
 * @param {string} credentialsFilePath - credentials config file path
 * @returns {Promise<any>} the response body wrapped inside a Promise
 */
async function getToken (credentialsFilePath) {
  let authFileContent = ''

  try {
    const filePath = path.isAbsolute(credentialsFilePath) ? credentialsFilePath : path.join(process.cwd(), credentialsFilePath)
    authFileContent = fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    const { name, message, details } = error
    throw new SDKError(name, 'readFileSync', '', message, details)
  }

  let config = null
  try {
    config = JSON.parse(authFileContent)
  } catch (error) {
    const { name, message, details } = error
    throw new SDKError(name, 'JSON.parse', '', message, details)
  }

  if (config.accessToken) {
    // If config has DEV token
    return {
      accessToken: config.accessToken,
      type: 'Bearer',
      expires: 24 * 60 * 60 * 1000
    }
  }

  return exchange(config)
    .then(data => {
      return {
        accessToken: data.access_token,
        type: data.token_type,
        expires: data.expires_in
      }
    })
    .catch(error => {
      const { name, type, message, details } = error
      throw new SDKError(name, type || 'Exchange Token', '', message, details)
    })
}

module.exports = getToken
