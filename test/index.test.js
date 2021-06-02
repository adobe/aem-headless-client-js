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

const { AEMHeadless } = require('../src')
const fetch = require('cross-fetch')

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
    json: async (data) => ({
      data
    })
  })
})

test('sdk valid params', () => {
  // check success response
  const config = { serviceURL: 'test', auth: 'test' }
  sdk = new AEMHeadless(config)
  expect(sdk).toHaveProperty('serviceURL')
  expect(sdk).toHaveProperty('endpoint')
})

test('sdk missing params', () => {
  // check success response
  const config = {}
  sdk = new AEMHeadless(config)
  expect(sdk).toHaveProperty('serviceURL')
  expect(sdk).toHaveProperty('endpoint')
})

test('sdk missing param serviceURL', () => {
  // check success response
  const config = { endpoint: 'test' }
  sdk = new AEMHeadless(config)
  expect(sdk).toHaveProperty('serviceURL')
  expect(sdk).toHaveProperty('endpoint')
})

test('persistQuery API Success', () => {
  // check success response
  const promise = sdk.persistQuery(queryString, `${persistedName}-${Date.now()}`)
  return expect(promise).resolves.toBeTruthy()
})

test('persistQuery API Error', () => {
  fetch.mockRejectedValue({
    ok: false
  })
  // check error response
  const promise = sdk.persistQuery(queryString, persistedName)
  return expect(promise).rejects.toThrow()
})

test('listPersistedQueries API Success', () => {
  const promise = sdk.listPersistedQueries()
  return expect(promise).resolves.toBeTruthy()
})

test('runQuery API Success', () => {
  // check success response
  const promise = sdk.runQuery(queryString)
  return expect(promise).resolves.toBeTruthy()
})

test('runQuery API Error', () => {
  fetch.mockRejectedValue({
    ok: false
  })
  // check error response
  const promise = sdk.runQuery()
  return expect(promise).rejects.toThrow()
})

test('runPersistedQuery API Success', () => {
  // check success response
  const promise = sdk.runPersistedQuery(persistedName)
  return expect(promise).resolves.toBeTruthy()
})

test('runPersistedQuery API Error', () => {
  fetch.mockRejectedValue({
    ok: false
  })
  // check error response
  const promise = sdk.runPersistedQuery('/test')
  return expect(promise).rejects.toThrow()
})
