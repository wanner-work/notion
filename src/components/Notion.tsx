import NotionBlock from './NotionBlock'
import NotionCustomBlock from '../interfaces/NotionCustomBlock'
import NotionQueryData from '../interfaces/NotionQueryData'

interface Props {
  data: NotionQueryData
  custom?: NotionCustomBlock[]
}

export default function Notion ({ data, custom }: Props) {
  return <>
    {data.map((object) => <NotionBlock block={object.block} children={object.children} level={object.level} key={object.block.id} custom={custom} />)}
  </>
}