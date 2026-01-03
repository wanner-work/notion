import { FunctionComponent, Suspense, useCallback } from 'react'
import NotionBlockObject from '../interfaces/NotionBlockObject'
import NotionBlockTypes from '../interfaces/NotionBlockTypes'
import NotionDefault from './blocks/NotionDefault'
import NotionHeading from './blocks/NotionHeading'
import NotionParagraph from './blocks/NotionParagraph'

export default function NotionBlock({
  block,
  level = 0,
  sub,
  config
}: Readonly<NotionBlockObject>) {
  let Component: FunctionComponent<NotionBlockObject<any>>

  const getCustomComponent = useCallback(
    (type: NotionBlockTypes) => config?.blocks?.find((c) => c.type === type)?.component,
    [config?.blocks]
  )

  switch (block.type) {
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      Component = getCustomComponent(block.type) || NotionHeading
      break
    case 'paragraph':
      Component = getCustomComponent(block.type) || NotionParagraph
      break
    default:
      Component = getCustomComponent(block.type) || NotionDefault
  }

  return (
    <Suspense>
      <Component block={block} level={level} sub={sub} config={config} />
    </Suspense>
  )
}
