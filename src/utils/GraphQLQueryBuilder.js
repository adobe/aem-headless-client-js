const types = require('../types') // eslint-disable-line
const { AEM_GRAPHQL_TYPES } = require('./config')

/**
 * @param {object} obj - object representing query arguments
 * @returns {string} - query args as a string
 */
function objToStringArgs (obj) {
  let str = ''
  for (const [key, value] of Object.entries(obj)) {
    let val = typeof value === 'string' ? `"${value}"` : value
    val = typeof value === 'object' ? `{ ${objToStringArgs(value)} }` : value
    str += `${key}:${val}\n`
  }
  return str
}

/**
 * Returns a Query for model by path
 *
 * @private
 * @param {string} model - contentFragment Model Name
 * @param {string} itemQuery - GraphQL query for one item
 * @param {ModelByPathArgs} args - Query arguments
 * @returns {QueryBuilderResult}
 */
const __modelByPath = (model, itemQuery, args) => {
  if (!args || !args._path) {
    throw new Error('Missing required param "_path"')
  }
  const type = AEM_GRAPHQL_TYPES.BY_PATH
  const query = `{
    ${model}${type}(
      ${objToStringArgs(args)}
    ) {
      item ${itemQuery}
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
 * @param {string} itemQuery - GraphQL query for one item
 * @param {ModelListArgs} [args={}] - Query arguments
 * @returns {QueryBuilderResult}
 */
const __modelList = (model, itemQuery, args = {}) => {
  const type = AEM_GRAPHQL_TYPES.LIST
  const query = `{
    ${model}${type}(
      ${objToStringArgs(args)}
    ) {
      items ${itemQuery}
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
 * @param {string} itemQuery - GraphQL query for one item
 * @param {ModelPaginatedArgs} [args={}] - Query arguments
 * @returns {QueryBuilderResult}
 */
const __modelPaginated = (model, itemQuery, args = {}) => {
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
        node ${itemQuery}
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
 * @param {string} itemQuery - GraphQL query for one item
 * @param {types.ModelArgs} [args={}] - Query arguments
 * @returns {types.QueryBuilderResult} - returns query string
 */
const graphQLQueryBuilder = (model, itemQuery, args = {}) => {
  if (args._path) {
    return __modelByPath(model, itemQuery, args)
  }

  if (args.first || args.after) {
    return __modelPaginated(model, itemQuery, args)
  }

  return __modelList(model, itemQuery, args)
}

module.exports = {
  graphQLQueryBuilder,
  getQueryType
}
