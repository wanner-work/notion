import { FunctionComponent, Suspense, useCallback } from 'react'
import NotionHeading from './blocks/NotionHeading'
import NotionParagraph from './blocks/NotionParagraph'
import NotionImage from './blocks/NotionImage'
import NotionBlockTypes from '../interfaces/NotionBlockTypes'
import NotionCustomBlock from '../interfaces/NotionCustomBlock'
import NotionDefault from './blocks/NotionDefault'
import NotionAudio from './blocks/NotionAudio'
import NotionBlockObject from '../interfaces/NotionBlockObject'

interface Props extends NotionBlockObject {
  custom?: NotionCustomBlock[]
}

export default function NotionBlock ({ block, level = 0, children, custom }: Props) {
  let Component: FunctionComponent<NotionBlockObject<any>>

  const getCustomComponent = useCallback((type: NotionBlockTypes) => custom?.find(c => c.type === type)?.component, [custom])

  switch (block.type) {
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      Component = getCustomComponent(block.type) || NotionHeading
      break
    case 'paragraph':
      Component = getCustomComponent(block.type) || NotionParagraph
      break
    case 'image':
      Component = getCustomComponent(block.type) || NotionImage
      break
    case 'audio':
      Component = getCustomComponent(block.type) || NotionAudio
      break
    default:
      Component = getCustomComponent(block.type) || NotionDefault
  }


  return <Suspense fallback="loading..."><Component block={block} level={level} children={children} /></Suspense>
}