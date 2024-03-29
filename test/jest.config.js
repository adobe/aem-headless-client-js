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

module.exports = {
  testEnvironment: 'jsdom',
  rootDir: '..',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js'
  ],
  coverageThreshold: {
    global: {
      branches: 10,
      lines: 10,
      statements: 10
    }
  },
  reporters: [
    'default',
    'jest-junit'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/test/setup/jest.setup.js',
    '<rootDir>/test/setup/jest.setup.fetch.js'
  ]
}
