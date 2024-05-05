import { BlockObjectResponse, ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import { useMemo } from 'react'
import NotionBlock from './NotionBlock'

interface Props {
  data: ListBlockChildrenResponse
}

export default function Notion ({ data }: Props) {
  const blocks = useMemo(() => data.results as BlockObjectResponse[], [data])

  return <>
    {blocks.map((block) => <NotionBlock block={block} key={block.id} />)}
  </>
}