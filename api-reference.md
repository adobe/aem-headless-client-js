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
with GraphQL endpoint, GraphQL serviceURL and auth if needed

**Kind**: global class  

* [AEMHeadless](#AEMHeadless)
    * [new AEMHeadless(config)](#new_AEMHeadless_new)
    * [.runQuery(query, [options], [retryOptions])](#AEMHeadless+runQuery) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.persistQuery(query, path, [options], [retryOptions])](#AEMHeadless+persistQuery) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.listPersistedQueries([options], [retryOptions])](#AEMHeadless+listPersistedQueries) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.runPersistedQuery(path, [variables], [options], [retryOptions])](#AEMHeadless+runPersistedQuery) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="new_AEMHeadless_new"></a>

### new AEMHeadless(config)
Constructor.

If param is a string, it's treated as AEM server URL, default GraphQL endpoint is used.
For granular params, use config object

<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>config</td><td><code>string</code> | <code>object</code></td><td><p>Configuration object, or AEM server URL string</p>
</td>
    </tr><tr>
    <td>[config.serviceURL]</td><td><code>string</code></td><td><p>AEM server URL</p>
</td>
    </tr><tr>
    <td>[config.endpoint]</td><td><code>string</code></td><td><p>GraphQL endpoint</p>
</td>
    </tr><tr>
    <td>[config.auth]</td><td><code>string</code> | <code>Array</code></td><td><p>Bearer token string or [user,pass] pair array</p>
</td>
    </tr><tr>
    <td>[config.fetch]</td><td><code>object</code></td><td><p>custom Fetch instance</p>
</td>
    </tr>  </tbody>
</table>

<a name="AEMHeadless+runQuery"></a>

### aemHeadless.runQuery(query, [options], [retryOptions]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a POST request JSON data.

**Kind**: instance method of [<code>AEMHeadless</code>](#AEMHeadless)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - the response body wrapped inside a Promise  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>query</td><td><code>string</code></td><td></td><td><p>the query string</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td><p>additional POST request options</p>
</td>
    </tr><tr>
    <td>[retryOptions]</td><td><code>object</code></td><td><code>{}</code></td><td><p>retry options for @adobe/aio-lib-core-networking</p>
</td>
    </tr>  </tbody>
</table>

<a name="AEMHeadless+persistQuery"></a>

### aemHeadless.persistQuery(query, path, [options], [retryOptions]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a PUT request JSON data.

**Kind**: instance method of [<code>AEMHeadless</code>](#AEMHeadless)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - the response body wrapped inside a Promise  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>query</td><td><code>string</code></td><td></td><td><p>the query string</p>
</td>
    </tr><tr>
    <td>path</td><td><code>string</code></td><td></td><td><p>AEM path to save query, format: configuration_name/endpoint_name</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td><p>additional PUT request options</p>
</td>
    </tr><tr>
    <td>[retryOptions]</td><td><code>object</code></td><td><code>{}</code></td><td><p>retry options for @adobe/aio-lib-core-networking</p>
</td>
    </tr>  </tbody>
</table>

<a name="AEMHeadless+listPersistedQueries"></a>

### aemHeadless.listPersistedQueries([options], [retryOptions]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a GET request JSON data.

**Kind**: instance method of [<code>AEMHeadless</code>](#AEMHeadless)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - the response body wrapped inside a Promise  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td><p>additional GET request options</p>
</td>
    </tr><tr>
    <td>[retryOptions]</td><td><code>object</code></td><td><code>{}</code></td><td><p>retry options for @adobe/aio-lib-core-networking</p>
</td>
    </tr>  </tbody>
</table>

<a name="AEMHeadless+runPersistedQuery"></a>

### aemHeadless.runPersistedQuery(path, [variables], [options], [retryOptions]) ⇒ <code>Promise.&lt;any&gt;</code>
Returns a Promise that resolves with a GET request JSON data.

**Kind**: instance method of [<code>AEMHeadless</code>](#AEMHeadless)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - the response body wrapped inside a Promise  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>path</td><td><code>string</code></td><td></td><td><p>AEM path for persisted query, format: configuration_name/endpoint_name</p>
</td>
    </tr><tr>
    <td>[variables]</td><td><code>object</code></td><td><code>{}</code></td><td><p>query variables</p>
</td>
    </tr><tr>
    <td>[options]</td><td><code>object</code></td><td><code>{}</code></td><td><p>additional GET request options</p>
</td>
    </tr><tr>
    <td>[retryOptions]</td><td><code>object</code></td><td><code>{}</code></td><td><p>retry options for @adobe/aio-lib-core-networking</p>
</td>
    </tr>  </tbody>
</table>

