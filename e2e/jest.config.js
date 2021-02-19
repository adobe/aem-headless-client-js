module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    '../test/jest/jest.setup.js'
  ],
  testRegex: './e2e/e2e.js'
}
