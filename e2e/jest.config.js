module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    '../test/setup/jest.setup.js'
  ],
  testRegex: './e2e/e2e.js'
}
