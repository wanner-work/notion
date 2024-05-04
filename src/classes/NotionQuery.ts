import {
  ListBlockChildrenParameters,
  ListBlockChildrenResponse
} from '@notionhq/client/build/src/api-endpoints'
import { Client } from '@notionhq/client'
import NotionQueryOptions from '../interfaces/NotionQueryOptions'
import NotionQueryCache from '../interfaces/NotionQueryCache'

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
  }

  /**
   * Execute the query to get all the children of a page or a parent block
   */
  public async execute(useCache = true): Promise<ListBlockChildrenResponse> {
    if (useCache) {
      if (this.cache && Date.now() - this.cache.timestamp < this.cacheMaxAge) {
        return this.cache.data
      } else {
        this.cache = undefined
      }
    }

    const response = await this.queryBlocks(this.id)

    if (this.cacheMaxAge > 0) {
      this.cache = {
        timestamp: Date.now(),
        data: response
      }
    }

    return response
  }

  /**
   * Query the blocks of a page or a parent block recursively to get all the children
   * @param id
   * @param nextCursor
   * @private
   */
  private async queryBlocks(id: string, nextCursor?: string) {
    const args: ListBlockChildrenParameters = {
      block_id: id
    }

    if (nextCursor) {
      args.start_cursor = nextCursor
    }

    const response = await this.client.blocks.children.list(args)

    if (response.has_more) {
      const next = await this.queryBlocks(id, response.next_cursor as string)
      response.results.push(...next.results)
    }

    return response
  }
}