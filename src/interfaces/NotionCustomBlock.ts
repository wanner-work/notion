import NotionBlockTypes from './NotionBlockTypes'
import { FunctionComponent } from 'react'
import NotionBlockObject from './NotionBlockObject'

export default interface NotionCustomBlock {
  type: NotionBlockTypes
  component: FunctionComponent<NotionBlockObject<any>>
}