import { BlockObjectResponse } from '@notionhq/client'
import NotionRenderConfig from './config/NotionRenderConfig'

export default interface NotionBlockObject<BlockTypeObjectResponse = BlockObjectResponse> {
  /**
   * The Notion block object.
   */
  block: BlockTypeObjectResponse

  /**
   * An array of child Notion block objects, if any.
   */
  sub?: NotionBlockObject[]

  /**
   * The nesting level of the Notion block within the document structure.
   * Defaults to 0 for top-level blocks.
   */
  level?: number

  /**
   * Configuration options for rendering Notion blocks.
   */
  config?: NotionRenderConfig
}
