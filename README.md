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
Import functions from the package
```javascript
const {
  postQuery,
  saveQuery,
  getQuery,
  listQueries
} = require('@adobe/aem-headless-sdk');
```

## Functions

<dl>
<dt><a href="#postQuery">postQuery(query, [endpoint], [options], [auth])</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Returns a Promise that resolves with a POST request JSON data.</p>
</dd>
<dt><a href="#saveQuery">saveQuery(query, endpoint, [options], [auth])</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Returns a Promise that resolves with a PUT request JSON data.</p>
</dd>
<dt><a href="#getQuery">getQuery(endpoint, [options], [auth])</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Returns a Promise that resolves with a GET request JSON data.</p>
</dd>
<dt><a href="#listQueries">listQueries([options], [auth])</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Returns a Promise that resolves with a GET request JSON data.</p>
</dd>
</dl>

<a name="postQuery"></a>

## postQuery(query, [endpoint], [options], [auth]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a POST request JSON data.

**Kind**: global function  
**Returns**: <code>Promise.&lt;any&gt;</code> - - the response body wrapped inside a Promise  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | the query string |
| [endpoint] | <code>string</code> | GraphQL endpoint, default env.AEM_GRAPHQL_ENDPOINT |
| [options] | <code>object</code> | additional POST request options, default {} |
| [auth] | <code>string</code> | user:pass auth string |

<a name="saveQuery"></a>

## saveQuery(query, endpoint, [options], [auth]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a PUT request JSON data.

**Kind**: global function  
**Returns**: <code>Promise.&lt;any&gt;</code> - - the response body wrapped inside a Promise  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | the query string |
| endpoint | <code>string</code> | AEM path to save query, format: /<configuration name>/<endpoint name> |
| [options] | <code>object</code> | additional PUT request options, default {} |
| [auth] | <code>string</code> | user:pass auth string |

<a name="getQuery"></a>

## getQuery(endpoint, [options], [auth]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a GET request JSON data.

**Kind**: global function  
**Returns**: <code>Promise.&lt;any&gt;</code> - - the response body wrapped inside a Promise  

| Param | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | AEM path for persisted query, format: /<configuration name>/<endpoint name> |
| [options] | <code>object</code> | additional GET request options, default {} |
| [auth] | <code>string</code> | user:pass auth string |

<a name="listQueries"></a>

## listQueries([options], [auth]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a GET request JSON data.

**Kind**: global function  
**Returns**: <code>Promise.&lt;any&gt;</code> - the response body wrapped inside a Promise  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | additional GET request options, default {} |
| [auth] | <code>string</code> | user:pass auth string |

### Contributing

Contributions are welcome! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
