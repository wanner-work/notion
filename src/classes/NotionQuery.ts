import {
  BlockObjectResponse,
  ListBlockChildrenParameters,
  ListBlockChildrenResponse
} from '@notionhq/client/build/src/api-endpoints'
import { Client } from '@notionhq/client'
import NotionQueryOptions from '../interfaces/NotionQueryOptions'
import NotionQueryCache from '../interfaces/NotionQueryCache'
import NotionBlockObject from '../interfaces/NotionBlockObject'
import NotionQueryData from '../interfaces/NotionQueryData'

export default class NotionQuery {
  /**
   * The id of the page or the parent block to query
   * @private
   */
  private readonly id: string

  /**
   * The official Notion client which will be used to query the API
   * @private
   */
  private readonly client: Client

  /**
   * The maximum age of the cache in milliseconds
   * @private
   */
  private readonly cacheMaxAge: number = 0

  /**
   * The cache object to store the query results
   * @private
   */
  private cache: NotionQueryCache | undefined

  /**
   * The debug mode to log additional information
   * @private
   */
  private readonly debug: boolean = false

  /**
   * The constructor of the NotionQuery class
   * @param id
   * @param integrationToken
   * @param options
   */
  constructor(id: string, integrationToken: string, options?: NotionQueryOptions) {
    this.id = id

    if (!integrationToken) {
      throw new Error('The Notion integration token is required to query the Notion API. Please provide a valid token. https://developers.notion.com/docs/create-a-notion-integration#getting-started')
    }

    try {
      this.client = new Client({
        auth: integrationToken
      })
    } catch (error) {
      throw new Error(`The Notion integration token provided is invalid. ${error.message}. Please provide a valid token. https://developers.notion.com/docs/create-a-notion-integration#getting-started`)
    }

    if (options?.cacheMaxAge) {
      this.cacheMaxAge = options.cacheMaxAge
    }
    if (options?.debug) {
      this.debug = options.debug
      this.log('Initialized')
    }
  }

  /**
   * Execute the query to get all the children of a page or a parent block
   */
  public async execute(useCache = true): Promise<NotionQueryData> {
    this.log('Execute')

    if (useCache) {
      this.log('Try using cache')
      if (this.cache && Date.now() - this.cache.timestamp < this.cacheMaxAge) {
        this.log('Cache hit, returning cached data')
        return this.cache.data
      } else {
        this.log('Cache expired or not available')
        this.cache = undefined
      }
    }

    this.log('Fetch data from Notion API')
    const original = await this.queryListBlock(this.id)
    const transformed = await this.transformListBlockResponse(original)
    if (this.cacheMaxAge > 0) {
      this.log('Store data in cache', 'Cache max age:', this.cacheMaxAge)
      this.cache = {
        timestamp: Date.now(),
        data: transformed
      }
      this.log('Data stored in cache')
    } else {
      this.log('Cache disabled or cache max age not set')
    }

    this.log(`Fetched ${original.results.length} parent blocks`)
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
      throw new Error(`NotionQuery: An error occurred while fetching the blocks of the page or the parent block. ${error.message}`)
    }

    if (response.has_more) {
      const next = await this.queryListBlock(id, response.next_cursor as string)
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
  public async transformListBlockResponse(response: ListBlockChildrenResponse, level = 0) {
    const objects: NotionBlockObject[] = []

    for (const block of response.results as BlockObjectResponse[]) {
      const object: NotionBlockObject = {
        level,
        block
      }

      if (block.has_children) {
        const children = await this.queryListBlock(block.id)
        object.children = await this.transformListBlockResponse(children, level + 1)
      }

      objects.push(object)
    }

    return objects
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