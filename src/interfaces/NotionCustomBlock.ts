import { FunctionComponent } from 'react'
import NotionBlockObject from './NotionBlockObject'
import NotionBlockTypes from './NotionBlockTypes'

export default interface NotionCustomBlock {
  type: NotionBlockTypes
  component: FunctionComponent<NotionBlockObject<any>>
}
