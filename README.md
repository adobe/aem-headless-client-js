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

[![Version](https://img.shields.io/npm/v/@adobe/aem-headless-client-sdk.svg)](https://npmjs.org/package/@adobe/aem-headless-client)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/aem-headless-client-sdk.svg)](https://npmjs.org/package/@adobe/aem-headless-client)
[![Build Status](https://github.com/adobe/aem-headless-client-sdk/workflows/Node.js%20CI/badge.svg?branch=main)](https://github.com/adobe/aem-headless-client/actions)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) 
[![Greenkeeper badge](https://badges.greenkeeper.io/adobe/aem-headless-client-sdk.svg)](https://greenkeeper.io/)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/aem-headless-client-sdk/master.svg?style=flat-square)](https://codecov.io/gh/adobe/aem-headless-client-sdk/)

# AEM Headless SDK Client

### TODO
This repository should be made public soon, especially if it uses GitHub Actions: we have a limited amount of github action minutes and actions in private repos count against our 2000 minute cap.

## Installation

```bash
$ npm install @adobe/aem-headless-client
```

## Usage

### Create AEMHeadless client

```javascript
const AEMHeadless = require('@adobe/aem-headless-client');
```
Configure SDK with Host and Auth data (if needed)
```javascript
const aemHeadlessClient = new AEMHeadless('<graphql_endpoint>', '<aem_host>', '<aem_token>' || ['<aem_user>', '<aem_pass>'])
// Eg:
const aemHeadlessClient = new AEMHeadless('content/graphql/endpoint.gql', AEM_HOST_URI, AEM_TOKEN || [AEM_USER, AEM_PASS])
```
### Use AEMHeadless client 

#### Promise syntax:
```javascript
aemHeadlessClient.postQuery(queryString)
  .then(data => console.log(data))
  .catch(e => console.error(e.toJSON()))

aemHeadlessClient.listQueries()
   .then(data => console.log(data))
   .catch(e => console.error(e.toJSON()))

aemHeadlessClient.saveQuery(queryString, 'wknd/persist-query-name')
   .then(data => console.log(data))
   .catch(e => console.error(e.toJSON()))

aemHeadlessClient.getQuery('wknd/persist-query-name')
   .then(data => console.log(data))
   .catch(e => console.error(e.toJSON()))
```
#### Within async/await:
```javascript
(async () => {
    let postData
    try {
        postData = aemHeadlessClient.postQuery(queryString)
    } catch (e) {
        console.error(e.toJSON())
    }
    
    let list
    try {
        list = aemHeadlessClient.listQueries()
    } catch (e) {
        console.error(e.toJSON())
    }

    try {
        aemHeadlessClient.saveQuery(queryString, 'wknd/persist-query-name')
    } catch (e) {
        console.error(e.toJSON())
    }
    
    let getData
    try {
        getData = aemHeadlessClient.getQuery('wknd/persist-query-name')
    } catch (e) {
        console.error(e.toJSON())
    }
})()    
```

## Authorization

If `auth` param is a string, it's treated as a Bearer token

If `auth` param is an array, expected data is ['user', 'pass'] pair, and Basic Authorization will be ued

If `auth` is not defined, Authorization header will not be set

### DEV token and service credentials

SDK contains helper function to get Auth token from credentials config file

```javascript
const { getToken } = require('@adobe/aem-headless-sdk')
(async () => {
    const { accessToken, type, expires } = await getToken('path/to/service-config.json')
    const sdkNode = new AEMHeadless('content/graphql/endpoint.gql', AEM_HOST_URI, accessToken)
    const data = sdkNode.postQuery(queryString)
})()
```
## API Reference

See generated [API Reference](./api-reference.md)


## Contributing

Contributions are welcome! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
