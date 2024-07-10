# E2E Tests

## Requirements

To run the e2e test you'll need these env variables set:
1. `AEM_HOST_URI`
2. `AEM_GRAPHQL_ENDPOINT` (if different from default  `content/graphql/endpoint.gql`)
3. `AEM_TOKEN` (or `AEM_USER` and `AEM_PASS`)

### Example
```bash
AEM_HOST_URI=http://localhost:4502
AEM_GRAPHQL_ENDPOINT=/content/cq:graphql/wknd-shared/endpoint.json
AEM_USER=admin
AEM_PASS=admin
```
## Run

`npm run e2e`

## Test overview

The tests cover:

1. Malformed required params
2. All APIs
    - persistQuery
    - listPersistedQueries
    - runPersistedQuery
    - runQuery

## Local AEM setup

1. Navigate to the [Software Distribution Portal](https://experience.adobe.com/#/downloads/content/software-distribution/en/aemcloud.html?fulltext=AEM*+SDK*&orderby=%40jcr%3Acontent%2Fjcr%3AlastModified&orderby.sort=desc&layout=list&p.offset=0&p.limit=1) > AEM as a Cloud Service and download the latest version of the AEM SDK.
2. Start AEM
```
java -jar aem-author-p4502.jar
```
3. Download the latest compiled AEM Package for WKND Site: [aem-guides-wknd.all-x.x.x.zip](https://github.com/adobe/aem-guides-wknd/releases/latest).
4. Install downloaded Demo Content package
5. Configure ENV variables
6. Run e2e test
