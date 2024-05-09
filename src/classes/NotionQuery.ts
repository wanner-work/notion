import { Client } from '@notionhq/client'
import {
  BlockObjectResponse,
  ListBlockChildrenParameters,
  ListBlockChildrenResponse
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
  constructor(
    integrationTokenOrClient: string | Client,
    options?: NotionQueryOptions
  ) {
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
      throw new Error(
        'NotionQuery: The Notion integration token is required to query the Notion API. Please provide a valid token. https://developers.notion.com/docs/create-a-notion-integration#getting-started'
      )
    }

    if (options?.debug) {
      this.debug = options.debug
      this.log('Initialized')
    }
  }

  /**
   * Execute the query to get all the children of a page or a parent block
   */
  public async execute(id: string): Promise<NotionQueryData> {
    this.log('Fetch data for id', id)

    const response = await this.queryListBlock(id)
    const transformed = await this.transform(response)

    this.log(`Fetched ${transformed.length} parent blocks`)
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
      object.children = await this.transform(children, level + 1)
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
