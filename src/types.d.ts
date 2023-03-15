/**
 * Query string type
 */
export type QueryString = string;
/**
 * GraphQL Model type
 */
export type Model = {
    /**
     * * - model properties
     */
    "": any;
};
export type ModelResult = {
    /**
     * - response item
     */
    item: Model;
};
export type ModelResults = {
    /**
     * - response items
     */
    items: Model[];
};
export type ModelEdge = {
    /**
     * - item cursor
     */
    cursor: string;
    /**
     * - item node
     */
    node: Model;
};
export type PageInfo = {
    /**
     * - endCursor
     */
    endCursor: string;
    /**
     * - hasNextPage
     */
    hasNextPage: boolean;
    /**
     * - hasPreviousPage
     */
    hasPreviousPage: boolean;
    /**
     * - startCursor
     */
    startCursor: string;
};
export type ModelConnection = {
    /**
     * - edges
     */
    edges: ModelEdge[];
    /**
     * - pageInfo
     */
    pageInfo: PageInfo;
};
export type ModelByPathArgs = {
    /**
     * - contentFragment path
     */
    _path: string;
    /**
     * - contentFragment variation
     */
    variation: string;
};
export type ModelListArgs = {
    /**
     * - contentFragment locale
     */
    _locale?: string;
    /**
     * - contentFragment variation
     */
    variation?: string;
    /**
     * - list filter options
     */
    filter?: object;
    /**
     * - list sort options
     */
    sort?: string;
    /**
     * - list offset
     */
    offset?: number;
    /**
     * - list limit
     */
    limit?: number;
};
export type ModelPaginatedArgs = {
    /**
     * - contentFragment locale
     */
    _locale?: string;
    /**
     * - contentFragment variation
     */
    variation?: string;
    /**
     * - list filter options
     */
    filter?: object;
    /**
     * - list sort options
     */
    sort?: string;
    /**
     * - number of list items
     */
    first?: number;
    /**
     * - list starting cursor
     */
    after?: string;
};
export type ModelArgs = ModelByPathArgs | ModelListArgs | ModelPaginatedArgs;
export type QueryBuilderResult = {
    /**
     * - Query type
     */
    type: string;
    /**
     * - Query string
     */
    query: QueryString;
};
