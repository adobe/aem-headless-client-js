const isNodejs = (typeof process !== 'undefined' && process.versions && process.versions.node)
const isBrowser = !isNodejs && (typeof window !== 'undefined' || typeof self !== 'undefined')

module.exports = isBrowser
