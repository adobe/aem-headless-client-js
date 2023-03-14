/**
 * @typedef {String} QueryString
 * @property
 */

/**
 * @typedef {Object} Model
 * @property
 */

/**
 * @typedef {Object} ModelResult
 * @property {Model} item
 */

/**
 * @typedef {Object} ModelResults
 * @property {Model[]} items
 */

/**
 * @typedef {Object} ModelEdge
 * @property {string} cursor
 * @property {Model} node
 */

/**
 * @typedef {Object} PageInfo
 * @property {string} endCursor
 * @property {boolean} hasNextPage
 * @property {boolean} hasPreviousPage
 * @property {string} startCursor
 */

/**
 * @typedef {Object} ModelConnection
 * @property {ModelEdge[]} edges
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} ModelByPathArgs
 * @property {String} _path - contentFragment path
 * @property {String} variation - contentFragment variation
 */

/**
 * @typedef {Object} ModelListArgs
 * @property {String} [_locale] - contentFragment locale
 * @property {String} [variation] - contentFragment variation
 * @property {Object} [filter] - list filter options
 * @property {String} [sort] - list sort options
 * @property {Number} [offset] - list offset
 * @property {Number} [limit] - list limit
 */

/**
 * @typedef {Object} ModelPaginatedArgs
 * @property {String} [_locale] - contentFragment locale
 * @property {String} [variation] - contentFragment variation
 * @property {Object} [filter] - list filter options
 * @property {String} [sort] - list sort options
 * @property {Number} [first] - number of list items
 * @property {String} [after] - list starting cursor
 */

/**
 * @typedef {ModelByPathArgs|ModelListArgs|ModelPaginatedArgs} ModelArgs
 *
 */

/**
 * @typedef {Object} QueryBuilderResult
 * @property {String} type - Query type
 * @property {QueryString} query - Query string
 */

module.exports = {}
