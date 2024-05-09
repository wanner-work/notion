import NotionBlockProps from '../interfaces/NotionBlockProps'
import { FunctionComponent, useCallback } from 'react'
import NotionHeading from './blocks/NotionHeading'
import NotionParagraph from './blocks/NotionParagraph'
import NotionImage from './blocks/NotionImage'
import NotionBlockTypes from '../interfaces/NotionBlockTypes'
import NotionCustomBlock from '../interfaces/NotionCustomBlock'
import NotionDefault from './blocks/NotionDefault'

interface Props extends NotionBlockProps {
  custom?: NotionCustomBlock[]
}

export default function NotionBlock ({ block, nested, custom }: Props) {
  let component: FunctionComponent<NotionBlockProps>

  const getCustomComponent = useCallback((type: NotionBlockTypes) => custom?.find(c => c.type === type)?.component, [custom])

  switch (block.type) {
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      component = getCustomComponent(block.type) || NotionHeading
      break
    case 'paragraph':
      component = getCustomComponent(block.type) || NotionParagraph
      break
    case 'image':
      component = getCustomComponent(block.type) || NotionImage
      break
    default:
      component = getCustomComponent(block.type) || NotionDefault
  }

  return component({ block, nested })
}