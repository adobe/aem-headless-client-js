<!--
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
-->

[![Version](https://img.shields.io/npm/v/@adobe/aem-headless-client-js.svg)](https://npmjs.org/package/@adobe/aem-headless-client-js)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/aem-headless-client-js.svg)](https://npmjs.org/package/@adobe/aem-headless-client-js)
[![Build Status](https://github.com/adobe/aem-headless-client-js/workflows/Node.js%20CI/badge.svg?branch=main)](https://github.com/adobe/aem-headless-client-js/actions)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# AEM Headless Client for JavaScript

See [aem-headless-client-java](https://github.com/adobe/aem-headless-client-java) for the Java variant of this client
and [aem-headless-client-nodejs](https://github.com/adobe/aem-headless-client-nodejs) for the server-side Node.js variant.

## Installation

```bash
$ npm install @adobe/aem-headless-client-js
```

## Usage

### Create AEMHeadless client

```javascript
const AEMHeadless = require('@adobe/aem-headless-client-js');
```
Configure SDK with Host and Auth data (if needed)
```javascript
const aemHeadlessClient = new AEMHeadless({
    serviceURL: '<aem_host>',
    endpoint: '<graphql_endpoint>',
    auth: '<aem_token>' || ['<aem_user>', '<aem_pass>'],
    headers: {'<headername>': '<headervalue>', ...}
})
// Eg:
const aemHeadlessClient = new AEMHeadless({
    serviceURL: AEM_HOST_URI,
    endpoint: 'content/graphql/endpoint.gql',
    auth: [AEM_USER, AEM_PASS],
    headers: {'customerheadername': 'customerheadervalue'}
})
```
### Use AEMHeadless client 

#### Promise syntax:
```javascript
aemHeadlessClient.runQuery(queryString)
  .then(data => console.log(data))
  .catch(e => console.error(e.toJSON()))

aemHeadlessClient.listPersistedQueries()
   .then(data => console.log(data))
   .catch(e => console.error(e.toJSON()))

aemHeadlessClient.persistQuery(queryString, 'wknd/persist-query-name')
   .then(data => console.log(data))
   .catch(e => console.error(e.toJSON()))

aemHeadlessClient.runPersistedQuery('wknd/persist-query-name')
   .then(data => console.log(data))
   .catch(e => console.error(e.toJSON()))

aemHeadlessClient.runPersistedQuery('wknd/persist-query-name-with-variables', { name: 'John Doe'})
    .then(data => console.log(data))
    .catch(e => console.error(e.toJSON()))
```
#### Within async/await:
```javascript
(async () => {
    let postData
    try {
        postData = await aemHeadlessClient.runQuery(queryString)
    } catch (e) {
        console.error(e.toJSON())
    }
    
    let list
    try {
        list = await aemHeadlessClient.listPersistedQueries()
    } catch (e) {
        console.error(e.toJSON())
    }

    try {
        await aemHeadlessClient.persistQuery(queryString, 'wknd/persist-query-name')
    } catch (e) {
        console.error(e.toJSON())
    }
    
    let getData
    try {
        getData = await aemHeadlessClient.runPersistedQuery('wknd/persist-query-name')
    } catch (e) {
        console.error(e.toJSON())
    }
})()    
```

#### Pagination:
```javascript
(async () => {
    const model = 'article'
    const fields = `{
        title
        _path
        authorFragment {
          firstName
          profilePicture {
            ...on ImageRef {
              _authorUrl
            }
          }
        }
      }`
    
    // Loop all pages (default Cursor based)
    const cursorQueryAll = await aemHeadlessClient.runPaginatedQuery(model, fields, { pageSize: 3 })
    for await (let value of cursorQueryAll) {
        console.log('cursorQueryAll', value)
    }
    // Manually get next page (default pageSize = 10)
    const cursorQuery = await aemHeadlessClient.runPaginatedQuery(model, fields)
    while (true) {
        const { done, value } = await cursorQuery.next();
        if (done) break
        console.log('cursorQuery', value)
    }
})()
```

## Authorization

If `auth` param is a string, it's treated as a Bearer token

If `auth` param is an array, expected data is ['user', 'pass'] pair, and Basic Authorization will be used

If `auth` is not defined, Authorization header will not be set

## API Reference

See generated [API Reference](./api-reference.md)

## Contributing

Contributions are welcome! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
