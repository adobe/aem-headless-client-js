require('../types') // eslint-disable-line
const { AEM_GRAPHQL_TYPES } = require('./config')

/**
 *
 * @private
 * @param {object} obj - object representing query arguments
 * @returns {string} - query args as a string
 */
function objToStringArgs (obj) {
  let str = ''
  for (const [key, value] of Object.entries(obj)) {
    let val = typeof value === 'string' ? `"${value}"` : value
    val = typeof value === 'object' ? `{ ${objToStringArgs(value)} }` : val
    str += `${key}:${val}\n`
  }
  return str
}

/**
 * Returns a Query for model by path
 *
 * @private
 * @param {string} model - contentFragment Model Name
 * @param {string} fields - The query string for item fields.
 * @param {ModelByPathArgs} args - Query arguments
 * @returns {QueryBuilderResult}
 */
const __modelByPath = (model, fields, args) => {
  if (!args || !args._path) {
    throw new Error('Missing required param "_path"')
  }
  const type = AEM_GRAPHQL_TYPES.BY_PATH
  const query = `{
    ${model}${type}(
      ${objToStringArgs(args)}
    ) {
      item ${fields}
    }
  }`

  return {
    type,
    query
  }
}

/**
 * Returns a Query for model list
 *
 * @private
 * @param {string} model - contentFragment Model Name
 * @param {string} fields - The query string for item fields.
 * @param {ModelListArgs} [args={}] - Query arguments
 * @returns {QueryBuilderResult}
 */
const __modelList = (model, fields, args = {}) => {
  const type = AEM_GRAPHQL_TYPES.LIST
  const query = `{
    ${model}${type}(
      ${objToStringArgs(args)}
    ) {
      items ${fields}
    }
  }`

  return {
    type,
    query
  }
}

/**
 * Returns a Query for model list
 *
 * @private
 * @param {string} model - contentFragment Model Name
 * @param {string} fields - The query string for item fields.
 * @param {ModelPaginatedArgs} [args={}] - Query arguments
 * @returns {QueryBuilderResult}
 */
const __modelPaginated = (model, fields, args = {}) => {
  const type = AEM_GRAPHQL_TYPES.PAGINATED
  const query = `{
    ${model}${type}(
      ${objToStringArgs(args)}
    ) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node ${fields}
        cursor
      }
    }
  }`

  return {
    type,
    query
  }
}

const getQueryType = (args = {}) => {
  if (args._path) {
    return AEM_GRAPHQL_TYPES.BY_PATH
  }

  if (args.first || args.after) {
    return AEM_GRAPHQL_TYPES.PAGINATED
  }

  return AEM_GRAPHQL_TYPES.LIST
}

/**
 * Returns a Query for a model and type
 *
 * @param {string} model - contentFragment Model Name
 * @param {string} fields - The query string for item fields
 * @param {ModelArgs} [args={}] - Query arguments
 * @returns {QueryBuilderResult} - returns object with query string and type
 */
const graphQLQueryBuilder = (model, fields, args = {}) => {
  if (args._path) {
    return __modelByPath(model, fields, args)
  }

  if (args.first || args.after) {
    return __modelPaginated(model, fields, args)
  }

  return __modelList(model, fields, args)
}

module.exports = {
  graphQLQueryBuilder,
  getQueryType
}
