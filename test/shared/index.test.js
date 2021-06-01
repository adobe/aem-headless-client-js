/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const AEMHeadless = require('../../src')
// /////////////////////////////////////////////
const queryString = `
{
  adventureList {
    items {
      _path
    }
  }
}
`
const persistedName = 'wknd/persist-query-name'
let sdk = {}

beforeEach(() => {
  sdk = new AEMHeadless({
    endpoint: 'endpoint/path.gql',
    serviceURL: 'http://localhost',
    auth: ['user', 'pass']
  })

  fetch.resetMocks()
  fetch.mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      data: 'test'
    })
  })
})

test('API: persistQuery API Success', () => {
  // check success response
  const promise = sdk.persistQuery(queryString, `${persistedName}-${Date.now()}`)
  return expect(promise).resolves.toBeTruthy()
})

test('API: invalid serviceURL', () => {
  const serviceURL = 'invalid url path'
  const config = {
    serviceURL
  }
  sdk = new AEMHeadless(config)
  const promise = sdk.runQuery(queryString)
  return expect(promise).rejects.toThrow(`Invalid URL/path: ${serviceURL}`)
})

test('API: persistQuery API Error', () => {
  fetch.mockRejectedValue({
    ok: false
  })
  // check error response
  const promise = sdk.persistQuery(queryString, persistedName)
  return expect(promise).rejects.toThrow()
})

test('API: listPersistedQueries API Success', () => {
  const promise = sdk.listPersistedQueries()
  return expect(promise).resolves.toBeTruthy()
})

test('API: runQuery API Success', () => {
  // check success response
  const promise = sdk.runQuery(queryString)
  return expect(promise).resolves.toBeTruthy()
})

test('API: runQuery API Error', () => {
  fetch.mockRejectedValue({
    ok: false
  })
  // check error response
  const promise = sdk.runQuery()
  return expect(promise).rejects.toThrow()
})

test('API: runPersistedQuery API Success', () => {
  // check success response
  const promise = sdk.runPersistedQuery(persistedName)
  return expect(promise).resolves.toBeTruthy()
})

test('API: runPersistedQuery API Error', () => {
  fetch.mockRejectedValue({
    ok: false
  })
  // check error response
  const promise = sdk.runPersistedQuery('/test')
  return expect(promise).rejects.toThrow()
})
// #181 2.2 Response error: JSON parsed - valid error defined in API response
test('API: custom error message', () => {
  fetch.mockResolvedValue({
    ok: false,
    json: async () => ({
      error: {
        message: 'API custom error'
      }
    })
  })
  // check error response
  const promise = sdk.runPersistedQuery('/test')
  return expect(promise).rejects.toThrow('API custom error')
})
// #175 2.3 Response error: Couldn't parse JSON - no error defined in API response
test('API: Failed response JSON parsing error', () => {
  const JsonError = Error('JSON parse error')
  fetch.mockResolvedValue({
    ok: false,
    json: async () => {
      throw JsonError
    }
  })

  const promise = sdk.runPersistedQuery('/test')
  return expect(promise).rejects.toThrow(JsonError)
})
// #191 3.2. Response ok: Data error - Couldn't parse the JSON from OK response
test('API: Successful response JSON parsing error', () => {
  const JsonError = Error('JSON parse error')
  fetch.mockResolvedValue({
    ok: true,
    json: async () => {
      throw JsonError
    }
  })

  const promise = sdk.runPersistedQuery('/test')
  return expect(promise).rejects.toThrow(JsonError)
})

test('ERROR: Error helper', () => {
  fetch.mockResolvedValue({
    ok: false
  })

  const promise = sdk.runPersistedQuery('/test')
  return promise.catch(e => {
    // eslint-disable-next-line
    return expect(e.toJSON()).toHaveProperty('message', e.message)
  })
})

test('API: auth as a token', () => {
  const config = {
    serviceURL: 'http://localhost',
    auth: 'token'
  }
  sdk = new AEMHeadless(config)
  const promise = sdk.runQuery(queryString)
  return expect(promise).resolves.toBeTruthy()
})

test('API: additional request options', () => {
  const config = {}
  sdk = new AEMHeadless(config)
  const promise = sdk.runQuery(queryString, { method: 'GET' })
  return expect(promise).resolves.toStrictEqual({ data: 'test' })
})

test('API: params validation', () => {
  fetch.mockResolvedValue({
    ok: false,
    json: async () => ({
      errors: [{
        message: 'API custom error'
      }]
    })
  })
  // check error response
  const promise = sdk.runQuery('/test')
  return expect(promise).rejects.toThrow('API custom error')
})

test('API: custom API error missing', () => {
  fetch.mockResolvedValue({
    ok: false,
    json: async () => ({})
  })

  const promise = sdk.runPersistedQuery('/test')
  return promise.catch(e => {
    // eslint-disable-next-line
    return expect(e.toJSON()).toHaveProperty('message', e.message)
  })
})

test('API: multiple API custom errors', () => {
  sdk = new AEMHeadless({
    endpoint: {},
    serviceURL: {}
  })
  // check error response
  const promise = sdk.runPersistedQuery('/test')
  return expect(promise).rejects.toThrow('Invalid URL/path:')
})
