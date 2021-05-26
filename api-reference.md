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
    * [new AEMHeadless(config)](#new_AEMHeadless_new)
    * [.runQuery(query, [options])](#AEMHeadless+runQuery) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.persistQuery(query, path, [options])](#AEMHeadless+persistQuery) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.listPersistedQueries([options])](#AEMHeadless+listPersistedQueries) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.runPersistedQuery(path, [options])](#AEMHeadless+runPersistedQuery) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="new_AEMHeadless_new"></a>

### new AEMHeadless(config)
Constructor.
If param is a string, it's treated as AEM server URL, default GraphQL endpoint is used.
For granular params, use config object


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> \| <code>string</code> | Configuration object, or AEM server URL string |
| [config.serviceURL] | <code>string</code> | AEM server URL |
| [config.endpoint] | <code>string</code> | GraphQL endpoint |
| [config.auth] | <code>string</code> \| <code>Array</code> | Bearer token string or [user,pass] pair array |

<a name="AEMHeadless+runQuery"></a>

### aemHeadless.runQuery(query, [options]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a POST request JSON data.

**Kind**: instance method of [<code>AEMHeadless</code>](#AEMHeadless)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - the response body wrapped inside a Promise  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>string</code> |  | the query string |
| [options] | <code>object</code> | <code>{}</code> | additional POST request options |

<a name="AEMHeadless+persistQuery"></a>

### aemHeadless.persistQuery(query, path, [options]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a PUT request JSON data.

**Kind**: instance method of [<code>AEMHeadless</code>](#AEMHeadless)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - the response body wrapped inside a Promise  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>string</code> |  | the query string |
| path | <code>string</code> |  | AEM path to save query, format: configuration_name/endpoint_name |
| [options] | <code>object</code> | <code>{}</code> | additional PUT request options |

<a name="AEMHeadless+listPersistedQueries"></a>

### aemHeadless.listPersistedQueries([options]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a GET request JSON data.

**Kind**: instance method of [<code>AEMHeadless</code>](#AEMHeadless)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - the response body wrapped inside a Promise  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> | <code>{}</code> | additional GET request options |

<a name="AEMHeadless+runPersistedQuery"></a>

### aemHeadless.runPersistedQuery(path, [options]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a GET request JSON data.

**Kind**: instance method of [<code>AEMHeadless</code>](#AEMHeadless)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - the response body wrapped inside a Promise  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | AEM path for persisted query, format: configuration_name/endpoint_name |
| [options] | <code>object</code> | <code>{}</code> | additional GET request options |

