import type {
  BlockObjectResponse as BlockObjectResponse$1,
  DataSourceObjectResponse,
  DatabaseObjectResponse,
  GetDatabaseParameters,
  PageObjectResponse,
  QueryDataSourceParameters
} from '@notionhq/client/build/src/api-endpoints'
import {BlockObjectResponse} from "@notionhq/client";
import {FunctionComponent} from "react";

type NotionBlockTypes = BlockObjectResponse['type'];

interface NotionCustomBlock {
  /**
   * The type of the Notion block.
   */
  type: NotionBlockTypes;
  /**
   * The React component used to render the Notion block.
   */
  component: FunctionComponent<NotionBlockObject<any>>;
}

interface NotionRenderConfig {
  /**
   * Custom blocks to override default Notion block rendering.
   * Each custom block should specify the `type` of Notion block it overrides
   * and the corresponding React component to render that block.
   *
   * @example
   * ```ts
   * import NotionCalloutBlock from "@/components/blocks/NotionCalloutBlock";
   *
   * const config: NotionRenderConfig = {
   *   blocks: [
   *     {
   *       type: "callout",
   *       component: NotionCalloutBlock
   *     }
   *   ]
   * }
   * ```
   */
  blocks?: NotionCustomBlock[];
  /**
   * If set to true, suppresses warnings for unsupported Notion block types.
   * It is recommended to set this to true in production environments.
   */
  hideUnsupportedBlockWarning?: boolean;
}

interface NotionBlockObject<BlockTypeObjectResponse = BlockObjectResponse> {
  /**
   * The Notion block object.
   */
  block: BlockTypeObjectResponse;
  /**
   * An array of child Notion block objects, if any.
   */
  sub?: NotionBlockObject[];
  /**
   * The nesting level of the Notion block within the document structure.
   * Defaults to 0 for top-level blocks.
   */
  level?: number;
  /**
   * Configuration options for rendering Notion blocks.
   */
  config?: NotionRenderConfig;
}

type NotionQueryData = NotionBlockObject[];

export interface NotionQuery {
  /**
   * Retrieve information and entries about a Notion database by its ID
   */
  retrieveDatabase(
    databaseId: string,
    options?: Omit<GetDatabaseParameters, 'database_id'>
  ): Promise<{
    database: DatabaseObjectResponse
    entries: (PageObjectResponse | DataSourceObjectResponse)[]
  }>
  /**
   * Retrieve information about a Notion database by its ID
   */
  retrieveDatabaseInformation(databaseId: string): Promise<DatabaseObjectResponse>
  /**
   * Retrieve entries of a Notion database by its ID
   */
  retrieveDatabaseEntries(
    databaseId: string,
    options?: Omit<QueryDataSourceParameters, 'data_source_id'>
  ): Promise<(PageObjectResponse | DataSourceObjectResponse)[]>
  /**
   * Retrieve entries of a Notion data source by its ID
   */
  retrieveDataSourceEntries(
    dataSourceId: string,
    options?: Omit<QueryDataSourceParameters, 'data_source_id'>
  ): Promise<(PageObjectResponse | DataSourceObjectResponse)[]>
  /**
   * Retrieve information and data about a Notion page by its ID
   */
  retrievePage(pageId: string): Promise<{
    page: PageObjectResponse
    data: NotionQueryData
  }>
  /**
   * Retrieve information and properties about a Notion page by its ID
   */
  retrievePageInformation(pageId: string): Promise<PageObjectResponse>
  /**
   * Execute the query to retrieve and transform the blocks of a page
   */
  retrievePageData(pageId: string): Promise<NotionQueryData>
  /**
   * Transform a block and recursively get its children
   */
  transformBlock(
    block: BlockObjectResponse$1,
    level: number
  ): Promise<NotionBlockObject<BlockObjectResponse$1>>
}
