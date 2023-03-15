import { QueryBuilderResult } from './types';

export = AEMHeadless;
/**
 * This class provides methods to call AEM GraphQL APIs.
 * Before calling any method initialize the instance
 * with GraphQL endpoint, GraphQL serviceURL and auth if needed
 */
declare class AEMHeadless {
    /**
     * Constructor.
     *
     * If param is a string, it's treated as AEM server URL, default GraphQL endpoint is used.
     * For granular params, use config object
     *
     * @param {string|object} config - Configuration object, or AEM server URL string
     * @param {string} [config.serviceURL] - AEM server URL
     * @param {string} [config.endpoint] - GraphQL endpoint
     * @param {(string|Array)} [config.auth] - Bearer token string or [user,pass] pair array
     * @param {object} [config.headers] - header { name: value, name: value, ... }
     * @param {object} [config.fetch] - custom Fetch instance
     */
    constructor(config: string | object);
    auth: any;
    headers: any;
    serviceURL: string;
    endpoint: string;
    fetch: any;
    /**
     * Returns a Promise that resolves with a POST request JSON data.
     *
     * @param {string|object} body - the query string or an object with query (and optionally variables) as a property
     * @param {object} [options={}] - additional POST request options
     * @param {object} [retryOptions={}] - retry options for @adobe/aio-lib-core-networking
     * @returns {Promise<any>} - the response body wrapped inside a Promise
     */
    runQuery(body: string | object, options?: object, retryOptions?: object): Promise<any>;
    /**
     * Returns a Promise that resolves with a PUT request JSON data.
     *
     * @param {string} query - the query string
     * @param {string} path - AEM path to save query, format: configuration_name/endpoint_name
     * @param {object} [options={}] - additional PUT request options
     * @param {object} [retryOptions={}] - retry options for @adobe/aio-lib-core-networking
     * @returns {Promise<any>} - the response body wrapped inside a Promise
     */
    persistQuery(query: string, path: string, options?: object, retryOptions?: object): Promise<any>;
    /**
     * Returns a Promise that resolves with a GET request JSON data.
     *
     * @param {object} [options={}] - additional GET request options
     * @param {object} [retryOptions={}] - retry options for @adobe/aio-lib-core-networking
     * @returns {Promise<any>} - the response body wrapped inside a Promise
     */
    listPersistedQueries(options?: object, retryOptions?: object): Promise<any>;
    /**
     * Returns a Promise that resolves with a GET request JSON data.
     *
     * @param {string} path - AEM path for persisted query, format: configuration_name/endpoint_name
     * @param {object} [variables={}] - query variables
     * @param {object} [options={}] - additional GET request options
     * @param {object} [retryOptions={}] - retry options for @adobe/aio-lib-core-networking
     * @returns {Promise<any>} - the response body wrapped inside a Promise
     */
    runPersistedQuery(path: string, variables?: object, options?: object, retryOptions?: object): Promise<any>;
    /**
     * Returns a Generator Function.
     *
     * @generator
     * @param {string} model - contentFragment model name
     * @param {string} fields - query string for item fields
     * @param {object} [args={}] - paginated query arguments
     * @param {object} [options={}] - additional POST request options
     * @param {object} [retryOptions={}] - retry options for @adobe/aio-lib-core-networking
     * @yields {null | Promise<object | Array>} - the response items wrapped inside a Promise
     */
    runPaginatedQuery(model: string, fields: string, args?: object, options?: object, retryOptions?: object): AsyncGenerator<any, void, unknown>;
    /**
     * Builds a GraphQL query string for the given parameters.
     *
     * @param {string} model - The contentFragment model name
     * @param {string} fields - The query string for item fields
     * @param {object} [args={}] - Query arguments
     * @returns {QueryBuilderResult} object with The GraphQL query string and type
     */
    buildQuery(model: string, fields: string, args?: object): QueryBuilderResult;
    /**
     * Returns the updated paging arguments based on the current arguments and the response data.
     *
     * @private
     * @param {object} args - The current paging arguments.
     * @param {object} data - Current page arguments.
     * @param {string} data.after - The cursor to start after.
     * @param {number} data.offset - The offset to start from.
     * @param {number} [data.limit = 10] - The maximum number of items to return per page.
     * @returns {object} The updated paging arguments.
     */
    private __updatePagingArgs;
    /**
     * Returns items list and paging info.
     *
     * @private
     * @param {string} model - contentFragment model name
     * @param {string} type - model query type: byPath, List, Paginated
     * @param {object} data - raw response data
     * @returns {object} - object with filtered data and paging info
     */
    private __filterData;
    /**
     * Returns an object for Request options
     *
     * @private
     * @param {string} [body] - Request body (the query string)
     * @param {object} [options] Additional Request options
     * @returns {object} the Request options object
     */
    private __getRequestOptions;
    /**
     * Returns a Promise that resolves with a PUT request JSON data.
     *
     * @private
     * @param {string} endpoint - Request endpoint
     * @param {string} [body=''] - Request body (the query string)
     * @param {object} [options={}] - Request options
     * @param {object} [retryOptions={}] - retry options for @adobe/aio-lib-core-networking
     * @returns {Promise<any>} the response body wrapped inside a Promise
     */
    private __handleRequest;
}
declare namespace AEMHeadless {
    export { AEMHeadless, ErrorCodes };
}
import ErrorCodes_1 = require("./utils/SDKErrors");
import ErrorCodes = ErrorCodes_1.codes;
