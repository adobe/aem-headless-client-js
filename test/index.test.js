/*
Copyright 2019 Adobe. All rights reserved.
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

beforeAll(() => {
  sdk = new AEMHeadless('endpoint/path.gql', 'http://localhost', ['user', 'pass'])
})

beforeEach(() => {
  fetch.resetMocks()
  fetch.mockResolvedValue({
    ok: true,
    status: 200,
    json: async (data) => ({
      data
    })
  })
})

test('saveQuery API Success', () => {
  // check success response
  const promise = sdk.saveQuery(queryString, `${persistedName}-${Date.now()}`)
  return expect(promise).resolves.toBeTruthy()
})

test('saveQuery API Error', () => {
  fetch.mockRejectedValue({
    ok: false
  })
  // check error response
  const promise = sdk.saveQuery(queryString, persistedName)
  return expect(promise).rejects.toThrow()
})

test('listQueries API Success', () => {
  const promise = sdk.listQueries()
  return expect(promise).resolves.toBeTruthy()
})

test('postQuery API Success', () => {
  // check success response
  const promise = sdk.postQuery(queryString)
  return expect(promise).resolves.toBeTruthy()
})

test('postQuery API Error', () => {
  fetch.mockRejectedValue({
    ok: false
  })
  // check error response
  const promise = sdk.postQuery()
  return expect(promise).rejects.toThrow()
})

test('getQuery API Success', () => {
  // check success response
  const promise = sdk.getQuery(persistedName)
  return expect(promise).resolves.toBeTruthy()
})

test('getQuery API Error', () => {
  fetch.mockRejectedValue({
    ok: false
  })
  // check error response
  const promise = sdk.getQuery('/test')
  return expect(promise).rejects.toThrow()
})
