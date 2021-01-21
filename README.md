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
const { AEMHeadless } = require('@adobe/aem-headless-sdk');
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

### Authorization

If `auth` param is a string, it's treated as a Bearer token

If `auth` param is an array, expected data is ['user', 'pass'] pair, and Basic Authorization will be ued

If `auth` is not defined, env variables will be checked for AEM_TOKEN || AEM_USER && AEM_PASS

If `auth` is not defined, and env variables are not set, Authorization header will not be set

#### DEV token and service credentials

SDK contains helper function to get Auth token from credentials config file

```javascript
const { getToken } = require('@adobe/aem-headless-sdk')

  getToken('path/to/service-config.json')
    .then(({ accessToken, type, expires }) => {
      const sdkNode = new AEMHeadless('content/graphql/endpoint.gql', AEM_HOST_URI, accessToken)

      sdkNode.postQuery(queryString)
        .then(data => console.log(data))
        .catch(e => console.error(e.toJSON()))
    })
    .catch(e => console.error(e.toJSON()))
```

<a name="AEMHeadless"></a>

## AEMHeadless
This class provides methods to call AEM GraphQL APIs.
Before calling any method initialize the instance
with GraphQL endpoint, GraphQL host and auth if needed

**Kind**: global class  

* [AEMHeadless](#AEMHeadless)
    * [new AEMHeadless(endpoint, [host], [auth])](#new_AEMHeadless_new)
    * [.postQuery(query, [options])](#AEMHeadless+postQuery) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.saveQuery(query, endpoint, [options])](#AEMHeadless+saveQuery) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.listQueries([options])](#AEMHeadless+listQueries) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getQuery(endpoint, [options])](#AEMHeadless+getQuery) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="new_AEMHeadless_new"></a>

### new AEMHeadless(endpoint, [host], [auth])
Constructor.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| endpoint | <code>string</code> |  | GraphQL endpoint |
| [host] | <code>string</code> | <code>&quot;env.AEM_HOST_URI&quot;</code> | GraphQL host |
| [auth] | <code>string</code> \| <code>Array</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Bearer token string or [user,pass] pair array. If not defined env variables are checked: env.AEM_TOKEN || env.AEM_USER && env.AEM_PASS |

<a name="AEMHeadless+postQuery"></a>

### aemHeadless.postQuery(query, [options]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a POST request JSON data.

**Kind**: instance method of [<code>AEMHeadless</code>](#AEMHeadless)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - the response body wrapped inside a Promise  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>string</code> |  | the query string |
| [options] | <code>object</code> | <code>{}</code> | additional POST request options |

<a name="AEMHeadless+saveQuery"></a>

### aemHeadless.saveQuery(query, endpoint, [options]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a PUT request JSON data.

**Kind**: instance method of [<code>AEMHeadless</code>](#AEMHeadless)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - the response body wrapped inside a Promise  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>string</code> |  | the query string |
| endpoint | <code>string</code> |  | AEM path to save query, format: configuration_name/endpoint_name |
| [options] | <code>object</code> | <code>{}</code> | additional PUT request options |

<a name="AEMHeadless+listQueries"></a>

### aemHeadless.listQueries([options]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a GET request JSON data.

**Kind**: instance method of [<code>AEMHeadless</code>](#AEMHeadless)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - the response body wrapped inside a Promise  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> | <code>{}</code> | additional GET request options |

<a name="AEMHeadless+getQuery"></a>

### aemHeadless.getQuery(endpoint, [options]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a GET request JSON data.

**Kind**: instance method of [<code>AEMHeadless</code>](#AEMHeadless)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - the response body wrapped inside a Promise  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| endpoint | <code>string</code> |  | AEM path for persisted query, format: configuration_name/endpoint_name |
| [options] | <code>object</code> | <code>{}</code> | additional GET request options |

### Contributing

Contributions are welcome! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
