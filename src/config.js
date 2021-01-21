const { AEM_TOKEN, AEM_HOST_URI, AEM_USER, AEM_PASS } = process.env

const AEM_GRAPHQL_ACTIONS = {
  persist: 'graphql/persist.json',
  execute: 'graphql/execute.json',
  list: 'graphql/list.json'
}

module.exports = {
  AEM_GRAPHQL_ACTIONS,
  AEM_HOST_URI,
  AEM_AUTHORIZATION: AEM_TOKEN || [AEM_USER, AEM_PASS]
}
