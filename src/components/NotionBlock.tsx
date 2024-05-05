import NotionBlockProps from '../interfaces/NotionBlockProps'
import { FunctionComponent } from 'react'
import NotionHeading from './types/NotionHeading'
import NotionParagraph from './types/NotionParagraph'
import NotionImage from './types/NotionImage'

export default function NotionBlock ({ block, nested }: NotionBlockProps) {
  let component: FunctionComponent<NotionBlockProps> = () => undefined

  switch (block.type) {
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      component = NotionHeading
      break
    case 'paragraph':
      component = NotionParagraph
      break
    case "image":
      component = NotionImage
      break
  }

  return component({ block, nested })
}