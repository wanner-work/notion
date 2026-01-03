import { Client } from '@notionhq/client'
import {
  BlockObjectResponse,
  DatabaseObjectResponse,
  DataSourceObjectResponse,
  GetDatabaseParameters,
  ListBlockChildrenParameters,
  ListBlockChildrenResponse,
  PageObjectResponse,
  QueryDataSourceParameters
} from '@notionhq/client/build/src/api-endpoints'
import NotionBlockObject from '../interfaces/NotionBlockObject'
import NotionQueryData from '../interfaces/NotionQueryData'
import NotionQueryOptions from '../interfaces/NotionQueryOptions'

export default class NotionQuery {
  /**
   * The official Notion client which will be used to query the API
   * @private
   */
  private readonly client: Client

  /**
   * The debug mode to log additional information
   * @private
   */
  private readonly debug: boolean = false

  /**
   * The constructor of the NotionQuery class
   * @param integrationTokenOrClient
   * @param options
   */
  constructor(integrationTokenOrClient: string | Client, options?: NotionQueryOptions) {
    if (typeof integrationTokenOrClient === 'string') {
      try {
        this.client = new Client({
          auth: integrationTokenOrClient
        })
      } catch (error) {
        throw new Error(
          `NotionQuery: The Notion integration token provided is invalid. ${error.message}. Please provide a valid token. https://developers.notion.com/docs/create-a-notion-integration#getting-started`
        )
      }
    } else if (typeof integrationTokenOrClient === 'object') {
      this.client = integrationTokenOrClient
    } else {
      throw new TypeError(
        'NotionQuery: The Notion integration token or a valid client is required to query the Notion API. Please provide a valid token. https://developers.notion.com/docs/create-a-notion-integration#getting-started'
      )
    }

    if (options?.debug) {
      this.debug = options.debug
      this.log('Initialized')
    }
  }

  /**
   * Retrieve information and entries about a Notion database by its ID
   * @param databaseId
   * @param options
   */
  public async retrieveDatabase(
    databaseId: string,
    options?: Omit<GetDatabaseParameters, 'database_id'>
  ) {
    this.log('Retrieve database and entries for id', databaseId)

    const [database, entries] = await Promise.all([
      this.retrieveDatabaseInformation(databaseId),
      this.retrieveDatabaseEntries(databaseId, options)
    ])

    this.log('Retrieved database and entries', { database, entries })

    return {
      database,
      entries
    }
  }

  /**
   * Retrieve information about a Notion database by its ID
   * @param databaseId
   */
  public async retrieveDatabaseInformation(databaseId: string) {
    this.log('Retrieve database for id', databaseId)

    const request = (await this.client.databases.retrieve({
      database_id: databaseId
    })) as DatabaseObjectResponse

    this.log('Retrieved database', request)

    return request
  }

  /**
   * Retrieve entries of a Notion database by its ID
   * @param databaseId the ID of the database to retrieve entries from
   * @param options the query options to filter, sort, and paginate the results
   */
  public async retrieveDatabaseEntries(
    databaseId: string,
    options?: Omit<QueryDataSourceParameters, 'data_source_id'>
  ) {
    this.log('Retrieve data source entries of database for id', databaseId)

    const database = await this.retrieveDatabaseInformation(databaseId)

    this.log('Retrieved data sources for database', database)

    const entries = database.data_sources.map((source) => source.id)

    this.log('Retrieve data source entries all data sources inside of database', entries)

    const results = await Promise.all(
      entries.map((entry) => this.retrieveDataSourceEntries(entry, options))
    )

    this.log('Retrieved all data source entries inside of database', results.flat())

    return results.flat()
  }

  /**
   * Retrieve entries of a Notion data source by its ID
   * @param dataSourceId the ID of the data source to retrieve entries from
   * @param options the query options to filter, sort, and paginate the results
   */
  public async retrieveDataSourceEntries(
    dataSourceId: string,
    options?: Omit<QueryDataSourceParameters, 'data_source_id'>
  ) {
    this.log('Retrieve data source entries for id', dataSourceId)

    const request = await this.client.dataSources.query({
      data_source_id: dataSourceId,
      ...options
    })

    this.log('Retrieved data source entries', request)

    return request.results as (DataSourceObjectResponse | PageObjectResponse)[]
  }

  /**
   * Retrieve information and data about a Notion page by its ID
   * @param pageId
   */
  public async retrievePage(pageId: string) {
    this.log('Retrieve page for id', pageId)

    const [page, data] = await Promise.all([
      this.retrievePageInformation(pageId),
      this.retrievePageData(pageId)
    ])

    this.log('Retrieved page', { page, data })

    return {
      page,
      data
    }
  }

  /**
   * Retrieve information and properties about a Notion page by its ID
   * @param pageId
   */
  public async retrievePageInformation(pageId: string): Promise<PageObjectResponse> {
    this.log('Retrieve page information for id', pageId)

    const result = await this.client.pages.retrieve({
      page_id: pageId
    })

    this.log('Retrieved page information', result)
    return result as PageObjectResponse
  }

  /**
   * Execute the query to retrieve and transform the blocks of a page
   * @param pageId
   */
  public async retrievePageData(pageId: string): Promise<NotionQueryData> {
    this.log('Retrieve page data for id', pageId)

    const response = await this.queryListBlock(pageId)
    const transformed = await this.transform(response)

    this.log(`Retrieved ${transformed.length} parent blocks`)
    return transformed
  }

  /**
   * Query the blocks of a page or a parent block recursively to get all the children
   * @param id
   * @param nextCursor
   * @private
   */
  private async queryListBlock(id: string, nextCursor?: string) {
    const args: ListBlockChildrenParameters = {
      block_id: id
    }

    if (nextCursor) {
      args.start_cursor = nextCursor
    }

    let response: ListBlockChildrenResponse

    try {
      response = await this.client.blocks.children.list(args)
    } catch (error) {
      throw new Error(
        `NotionQuery: An error occurred while fetching the blocks of the page or the parent block. ${error.message}`
      )
    }

    if (response.has_more) {
      const next = await this.queryListBlock(id, response.next_cursor)
      response.results.push(...next.results)
    }

    return response
  }

  /**
   * Recursively transform the list block response to a custom object with children
   * @param response
   * @param level
   * @private
   */
  public async transform(response: ListBlockChildrenResponse, level = 0) {
    const objects: NotionBlockObject[] = []

    for (const block of response.results as BlockObjectResponse[]) {
      objects.push(await this.transformBlock(block, level))
    }

    return objects
  }

  /**
   * Transform a block and recursively get its children
   * @param block
   * @param level
   */
  public async transformBlock(block: BlockObjectResponse, level: number) {
    const object: NotionBlockObject = {
      level,
      block
    }

    if (block.has_children) {
      const children = await this.queryListBlock(block.id)
      object.sub = await this.transform(children, level + 1)
    }

    return object
  }

  /**
   * Log additional information if debug mode is enabled
   * @param data
   * @private
   */
  private log(...data: any[]) {
    if (this.debug) {
      console.log('NotionQuery:', ...data)
    }
  }
}
