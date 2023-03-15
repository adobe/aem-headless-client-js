/**
 * Returns valid url.
 *
 * @private
 * @param {string} domain
 * @param {string} path
 * @returns {string} valid url
 */
export function __getUrl(domain: string, path: string): string;
/**
 * Removes first / in a path
 *
 * @private
 * @param {string} path
 * @returns {string} path
 */
export function __getPath(path: string): string;
/**
 * Add last / in domain
 *
 * @private
 * @param {string} domain
 * @returns {string} valid domain
 */
export function __getDomain(domain: string): string;
/**
 * Check valid url or absolute path
 *
 * @private
 * @param {string} url
 * @returns void
 */
export function __validateUrl(url: string): void;
/**
 * get Fetch instance
 *
 * @private
 * @param {object} [fetch]
 * @returns {object} fetch instance
 */
export function __getFetch(fetch?: object): object;
/**
 * Returns Authorization Header value.
 *
 * @private
 * @param {string|array} auth - Bearer token string or [user,pass] pair array
 * @returns {string} Authorization Header value
 */
export function __getAuthHeader(auth: string | any[]): string;
