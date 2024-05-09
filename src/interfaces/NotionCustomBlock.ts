import NotionBlockTypes from './NotionBlockTypes'
import { FunctionComponent } from 'react'
import NotionBlockProps from './NotionBlockProps'

export default interface NotionCustomBlock {
  type: NotionBlockTypes
  component: FunctionComponent<NotionBlockProps<any>>
}