const AEM_GRAPHQL_ACTIONS = {
  persist: 'graphql/persist.json',
  execute: 'graphql/execute.json',
  list: 'graphql/list.json',
  endpoint: 'content/graphql/global/endpoint.json',
  serviceURL: '/'
}

const AEM_GRAPHQL_TYPES = {
  BY_PATH: 'ByPath',
  LIST: 'List',
  PAGINATED: 'Paginated'
}

module.exports = {
  AEM_GRAPHQL_ACTIONS,
  AEM_GRAPHQL_TYPES
}
