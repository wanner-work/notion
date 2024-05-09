import { BlockObjectResponse, ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import { useMemo } from 'react'
import NotionBlock from './NotionBlock'
import NotionCustomBlock from '../interfaces/NotionCustomBlock'

interface Props {
  data: ListBlockChildrenResponse
  custom?: NotionCustomBlock[]
}

export default function Notion ({ data, custom }: Props) {
  const blocks = useMemo(() => data.results as BlockObjectResponse[], [data])

  return <>
    {blocks.map((block) => <NotionBlock block={block} key={block.id} custom={custom} />)}
  </>
}