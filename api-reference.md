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
# AEM HEADLESS SDK API Reference

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
    * [.getQuery(endpoint, [variables], [options])](#AEMHeadless+getQuery) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="new_AEMHeadless_new"></a>

### new AEMHeadless(endpoint, [host], [auth])
Constructor.


| Param | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | GraphQL endpoint |
| [host] | <code>string</code> | GraphQL host, if not defined absolute endpoint path will be passed to fetch |
| [auth] | <code>string</code> \| <code>Array</code> | Bearer token string or [user,pass] pair array |

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

### aemHeadless.getQuery(endpoint, [variables], [options]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a GET request JSON data.

**Kind**: instance method of [<code>AEMHeadless</code>](#AEMHeadless)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - the response body wrapped inside a Promise  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| endpoint | <code>string</code> |  | AEM path for persisted query, format: configuration_name/endpoint_name |
| [variables] | <code>object</code> | <code>{}</code> | query variables |
| [options] | <code>object</code> | <code>{}</code> | additional GET request options |

