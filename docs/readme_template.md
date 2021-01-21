<!--
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
-->

[![Version](https://img.shields.io/npm/v/@adobe/aem-headless-sdk.svg)](https://npmjs.org/package/@adobe/aem-headless-sdk)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/aem-headless-sdk.svg)](https://npmjs.org/package/@adobe/aem-headless-sdk)
[![Build Status](https://travis-ci.com/adobe/aem-headless-sdk.svg?branch=master)](https://travis-ci.com/adobe/aem-headless-sdk)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Greenkeeper badge](https://badges.greenkeeper.io/adobe/aem-headless-sdk.svg)](https://greenkeeper.io/)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/aem-headless-sdk/master.svg?style=flat-square)](https://codecov.io/gh/adobe/aem-headless-sdk/)

# AEM Headless SDK

### Installing

```bash
$ npm install @adobe/aem-headless-sdk
```

### Usage
Import AEMHeadless Class
```javascript
const AEMHeadless = require('@adobe/aem-headless-sdk');
```
Configure SDK with Host and Auth data (if needed)
```javascript
const sdk = new AEMHeadless('<graphql_endpoint>', '<aem_host>', '<aem_token>' || ['<aem_user>', '<aem_pass>'])
// Eg:
const sdk = new AEMHeadless('content/graphql/endpoint.gql', AEM_HOST_URI, AEM_TOKEN || [AEM_USER, AEM_PASS])
```
Use SDK methods. Eg:
```javascript
sdk.postQuery(queryString)
  .then(data => console.log(data))
  .catch(e => console.error(e.toJSON()))

sdk.listQueries()
   .then(data => console.log(data))
   .catch(e => console.error(e.toJSON()))

sdk.saveQuery(queryString, 'wknd/persist-query-name')
   .then(data => console.log(data))
   .catch(e => console.error(e.toJSON()))

sdk.getQuery('wknd/persist-query-name')
   .then(data => console.log(data))
   .catch(e => console.error(e.toJSON()))
```

##$ Authorization

If `auth` param is a string, it's treated as a Bearer token
If `auth` param is an array, expected data is ['user', 'pass'] pair, and Basic Authorization will be ued
If `auth` is not defined, env variables will be checked for AEM_TOKEN || AEM_USER && AEM_PASS
If `auth` is not defined, and env variables are not set, Authorization header will not be set

{{>main-index~}}
{{>all-docs~}}

### Contributing

Contributions are welcome! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
