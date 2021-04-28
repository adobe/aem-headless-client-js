# E2E Tests

## Requirements

To run the e2e test you'll need these env variables set:
  1. `AEM_HOST_URI` - default 'http://localhost:4502'
  2. `AEM_GRAPHQL_ENDPOINT` - default  `content/graphql/global/endpoint.json`
  3. `AEM_TOKEN` (or `AEM_USER` and `AEM_PASS`) - default `AEM_USER=admin` and `AEM_PASS=admin`

## Run

`npm run e2e`

## Test overview

The tests cover:

1. Malformed required params
2. `read` APIs
