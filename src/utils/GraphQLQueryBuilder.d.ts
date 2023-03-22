import { ModelArgs, QueryBuilderResult } from '../types';

/**
 * Returns a Query for a model and type
 *
 * @param {string} model - contentFragment Model Name
 * @param {string} fields - The query string for item fields
 * @param {ModelArgs} [args={}] - Query arguments
 * @returns {QueryBuilderResult} - returns object with query string and type
 */
export function graphQLQueryBuilder(model: string, fields: string, args?: ModelArgs): QueryBuilderResult;
export function getQueryType(args?: {}): string;
