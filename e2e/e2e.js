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

const path = require('path')

// load .env values in the e2e folder, if any
require('dotenv').config({ path: path.join(__dirname, '.env') })

const { AEMHeadless } = require('../src')

const { AEM_TOKEN, AEM_USER, AEM_PASS, AEM_HOST_URI } = process.env

const queryString = `
 {
  personList {
    items {
      _path
      name
    }
  }
}
`
let sdk = {}

beforeAll(() => {
  sdk = new AEMHeadless('content/graphql/endpoint.gql', AEM_HOST_URI, AEM_TOKEN || [AEM_USER, AEM_PASS])
})

test('e2e test listQueries API Error', () => {
  const promise = sdk.listQueries()
  // ???
  return expect(promise).rejects.toThrow()
})

test('e2e test postQuery API Success', () => {
  // check success response
  const promise = sdk.postQuery(queryString)
  return expect(promise).resolves.toBeTruthy()
})

test('e2e test getQuery API Error', () => {
  // check success response
  const promise = sdk.getQuery('/test')
  return expect(promise).rejects.toThrow()
})

test('e2e test getQuery API Success', () => {
  // check success response
  const promise = sdk.getQuery('/wknd/plain-article-query')
  return expect(promise).resolves.toBeTruthy()
})
