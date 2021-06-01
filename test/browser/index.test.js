/**
 * @jest-environment jsdom
 */

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
const { AEM_GRAPHQL_ACTIONS } = require('../../src/utils/config')
// /////////////////////////////////////////////
let sdk = {}

test('SDK Constructor: string as a constructor param is used as serviceURL', () => {
  sdk = new AEMHeadless('test')
  expect(sdk).toHaveProperty('serviceURL', 'test/')
})

test('SDK Constructor: Fetch is not required param "config.fetch" in Browser env', () => {
  const config = {}
  sdk = new AEMHeadless(config)
  expect(sdk).toHaveProperty('fetch', window.fetch)
})

test('SDK Constructor: if no config is provided default params are used', () => {
  const config = {}
  sdk = new AEMHeadless(config)
  expect(sdk).toHaveProperty('serviceURL', AEM_GRAPHQL_ACTIONS.serviceURL)
  expect(sdk).toHaveProperty('endpoint', AEM_GRAPHQL_ACTIONS.endpoint)
  expect(sdk).toHaveProperty('fetch', window.fetch)
})

test('SDK Constructor: all custom params should match', () => {
  const config = {
    serviceURL: 'test/',
    endpoint: '/test',
    auth: 'test'
  }
  sdk = new AEMHeadless(config)
  expect(sdk).toHaveProperty('serviceURL', 'test/')
  expect(sdk).toHaveProperty('endpoint', 'test')
  expect(sdk).toHaveProperty('auth', 'test')
})

test('SDK Constructor: auth is optional', () => {
  const config = {}
  sdk = new AEMHeadless(config)
  expect(sdk).toHaveProperty('auth', undefined)
})
