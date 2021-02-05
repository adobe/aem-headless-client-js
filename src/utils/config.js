const { AEM_HOST_URI, AEM_GRAPHQL_ENDPOINT, AEM_TOKEN, AEM_USER, AEM_PASS } = process.env

const AEM_GRAPHQL_ACTIONS = {
  endpoint: AEM_GRAPHQL_ENDPOINT,
  persist: 'graphql/persist.json',
  execute: 'graphql/execute.json',
  list: 'graphql/list.json'
}

module.exports = {
  AEM_GRAPHQL_ACTIONS,
  AEM_HOST_URI,
  AEM_AUTHORIZATION: AEM_TOKEN || (AEM_USER && AEM_PASS) ? [AEM_USER, AEM_PASS] : ''
}
