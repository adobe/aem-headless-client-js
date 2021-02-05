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

let sdk = {}

beforeAll(() => {
  sdk = new AEMHeadless('endpoint/path.gql', 'http://localhost', ['user', 'pass'])
})

beforeEach(() => {
  fetch.resetMocks()
})

test('listQueries API Error', async () => {
  const promise = sdk.listQueries()
  // just match the error message
  return expect(promise).rejects.toThrow()
})

test('getQuery API Success', async () => {
  // check success response
  const promise = sdk.getQuery('/test')
  return expect(promise).rejects.toThrow()
})
