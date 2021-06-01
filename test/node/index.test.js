/**
 * @jest-environment node
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

test('SDK Constructor: string as a constructor param fails in NodeJS env', () => {
  const config = 'http://localhost'
  expect(() => new AEMHeadless(config)).toThrow('Required param missing: config.fetch')
})

test('SDK Constructor: Fetch is a required param "config.fetch" in NodeJS env', () => {
  const config = {}
  expect(() => new AEMHeadless(config)).toThrow('Required param missing: config.fetch')
})

test('SDK Constructor: if no additional config is provided default params are used', () => {
  const config = {
    fetch
  }
  sdk = new AEMHeadless(config)
  expect(sdk).toHaveProperty('serviceURL', AEM_GRAPHQL_ACTIONS.serviceURL)
  expect(sdk).toHaveProperty('endpoint', AEM_GRAPHQL_ACTIONS.endpoint)
  expect(sdk).toHaveProperty('fetch', fetch)
})

test('SDK Constructor: all custom params should match', () => {
  const config = {
    serviceURL: 'test',
    endpoint: 'test',
    auth: 'test',
    fetch
  }
  sdk = new AEMHeadless(config)
  expect(sdk).toHaveProperty('serviceURL')
  expect(sdk).toHaveProperty('endpoint')
})

test('SDK Constructor: auth is optional', () => {
  const config = {
    fetch
  }
  sdk = new AEMHeadless(config)
  expect(sdk).toHaveProperty('auth', undefined)
})
