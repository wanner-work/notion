import type { BlockObjectResponse as BlockObjectResponse$1, DataSourceObjectResponse, DatabaseObjectResponse, GetDatabaseParameters, ListBlockChildrenResponse, PageObjectResponse, QueryDataSourceParameters } from "@notionhq/client/build/src/api-endpoints";
import type { NotionQueryData, NotionBlockObject } from '@wanner.work/notion'

export interface NotionQuery {
  /**
   * Retrieve information and entries about a Notion database by its ID
   */
  retrieveDatabase(databaseId: string, options?: Omit<GetDatabaseParameters, 'database_id'>): Promise<{
    database: DatabaseObjectResponse;
    entries: (PageObjectResponse | DataSourceObjectResponse)[];
  }>;
  /**
   * Retrieve information about a Notion database by its ID
   */
  retrieveDatabaseInformation(databaseId: string): Promise<DatabaseObjectResponse>;
  /**
   * Retrieve entries of a Notion database by its ID
   */
  retrieveDatabaseEntries(databaseId: string, options?: Omit<QueryDataSourceParameters, 'data_source_id'>): Promise<(PageObjectResponse | DataSourceObjectResponse)[]>;
  /**
   * Retrieve entries of a Notion data source by its ID
   */
  retrieveDataSourceEntries(dataSourceId: string, options?: Omit<QueryDataSourceParameters, 'data_source_id'>): Promise<(PageObjectResponse | DataSourceObjectResponse)[]>;
  /**
   * Retrieve information and data about a Notion page by its ID
   */
  retrievePage(pageId: string): Promise<{
    page: PageObjectResponse;
    data: NotionQueryData;
  }>;
  /**
   * Retrieve information and properties about a Notion page by its ID
   */
  retrievePageInformation(pageId: string): Promise<PageObjectResponse>;
  /**
   * Execute the query to retrieve and transform the blocks of a page
   */
  retrievePageData(pageId: string): Promise<NotionQueryData>;
  /**
   * Transform a block and recursively get its children
   */
  transformBlock(block: BlockObjectResponse$1, level: number): Promise<NotionBlockObject<BlockObjectResponse$1>>;
}