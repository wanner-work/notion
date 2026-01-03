import { FunctionComponent } from 'react'
import NotionBlockObject from './NotionBlockObject'
import NotionBlockTypes from './NotionBlockTypes'

export default interface NotionCustomBlock {
  /**
   * The type of the Notion block.
   */
  type: NotionBlockTypes

  /**
   * The React component used to render the Notion block.
   */
  component: FunctionComponent<NotionBlockObject<any>>
}
