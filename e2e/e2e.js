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

const path = require('path')
const fetch = require('cross-fetch')

// load .env values in the e2e folder, if any
require('dotenv').config({ path: path.join(__dirname, '.env') })

const AEMHeadless = require('../src')

const { AEM_TOKEN, AEM_USER, AEM_PASS, AEM_HOST_URI, AEM_GRAPHQL_ENDPOINT } = process.env

const queryString = `
{
  adventureList {
    items {
      _path
    }
  }
}
`
let sdk = {}
const persistedName = 'wknd/persist-query-name'

beforeEach(() => {
  sdk = new AEMHeadless({
    serviceURL: AEM_HOST_URI,
    endpoint: AEM_GRAPHQL_ENDPOINT,
    auth: AEM_TOKEN || [AEM_USER, AEM_PASS],
    fetch
  })
})

test('e2e test sdk valid params', () => {
  expect(sdk).toHaveProperty('serviceURL')
  expect(sdk).toHaveProperty('endpoint')
})

test('e2e test sdk missing params', () => {
  // check success response
  const config = { fetch }
  sdk = new AEMHeadless(config)
  expect(sdk).toHaveProperty('serviceURL')
  expect(sdk).toHaveProperty('endpoint')
})

test('e2e test sdk missing param serviceURL', () => {
  // check success response
  const config = { endpoint: 'test', fetch }
  sdk = new AEMHeadless(config)
  expect(sdk).toHaveProperty('serviceURL')
  expect(sdk).toHaveProperty('endpoint')
})

test('e2e test persistQuery API Success', () => {
  // check success response
  const promise = sdk.persistQuery(queryString, `${persistedName}-${Date.now()}`)
  return expect(promise).resolves.toBeTruthy()
})

test('e2e test persistQuery API Error', () => {
  // check error response
  const promise = sdk.persistQuery(queryString, persistedName)
  return expect(promise).rejects.toThrow()
})

test('e2e test listPersistedQueries API Success', () => {
  const promise = sdk.listPersistedQueries()
  return expect(promise).resolves.toBeTruthy()
})

test('e2e test runQuery API Success', () => {
  // check success response
  const promise = sdk.runQuery(queryString)
  return expect(promise).resolves.toBeTruthy()
})

test('e2e test runQuery API Error', () => {
  // check error response
  const promise = sdk.runQuery()
  return expect(promise).rejects.toThrow()
})

test('e2e test runPersistedQuery API Success', () => {
  // check success response
  const promise = sdk.runPersistedQuery(persistedName)
  return expect(promise).resolves.toBeTruthy()
})

test('e2e test runPersistedQuery API Error', () => {
  // check error response
  const promise = sdk.runPersistedQuery('/test')
  return expect(promise).rejects.toThrow()
})
