import NotionQueryData from '../interfaces/NotionQueryData'
import NotionRenderConfig from '../interfaces/config/NotionRenderConfig'
import NotionBlock from './NotionBlock'

interface Props {
  data: NotionQueryData
  config?: NotionRenderConfig
}

export default function Notion({ data, config }: Readonly<Props>) {
  return data.map((object) => (
    <NotionBlock
      block={object.block}
      sub={object.sub}
      level={object.level}
      key={object.block.id}
      config={config}
    />
  ))
}
