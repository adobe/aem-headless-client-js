/**
 * Query string type
 *
 * @private
 * @typedef {string} QueryString
 */

/**
 * GraphQL Model type
 *
 * @typedef {object} Model
 * @property {any} * - model properties
 */

/**
 * @typedef {object} ModelResult
 * @property {Model} item - response item
 */

/**
 * @typedef {object} ModelResults
 * @property {Model[]} items - response items
 */

/**
 * @typedef {object} ModelEdge
 * @property {string} cursor - item cursor
 * @property {Model} node - item node
 */

/**
 * @typedef {object} PageInfo
 * @property {string} endCursor - endCursor
 * @property {boolean} hasNextPage - hasNextPage
 * @property {boolean} hasPreviousPage - hasPreviousPage
 * @property {string} startCursor - startCursor
 */

/**
 * @typedef {object} ModelConnection
 * @property {ModelEdge[]} edges - edges
 * @property {PageInfo} pageInfo - pageInfo
 */

/**
 * @typedef {object} ModelByPathArgs
 * @property {string} _path - contentFragment path
 * @property {string} variation - contentFragment variation
 */

/**
 * @typedef {object} ModelListArgs
 * @property {string} [_locale] - contentFragment locale
 * @property {string} [variation] - contentFragment variation
 * @property {object} [filter] - list filter options
 * @property {string} [sort] - list sort options
 * @property {number} [offset] - list offset
 * @property {number} [limit] - list limit
 */

/**
 * @typedef {object} ModelPaginatedArgs
 * @property {string} [_locale] - contentFragment locale
 * @property {string} [variation] - contentFragment variation
 * @property {object} [filter] - list filter options
 * @property {string} [sort] - list sort options
 * @property {number} [first] - number of list items
 * @property {string} [after] - list starting cursor
 */

/**
 * @typedef {ModelByPathArgs|ModelListArgs|ModelPaginatedArgs} ModelArgs
 * @property {any} * - placeholder property
 */

/**
 * @typedef {object} QueryBuilderResult
 * @property {string} type - Query type
 * @property {QueryString} query - Query string
 */

/**
 * @typedef {object} ModelConfig
 * @property {number} [pageSize=10] - page size
 * @property {string|number} [after] - starting cursor or offset
 * @property {boolean} [useLimitOffset=false] - use offset pagination
 */

module.exports = {}
