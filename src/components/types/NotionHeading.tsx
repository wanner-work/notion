import {
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints'
import NotionRichText from '../common/NotionRichText'
import NotionBlockProps from '../../interfaces/NotionBlockProps'

interface Props extends NotionBlockProps {
  block:
    | Heading1BlockObjectResponse
    | Heading2BlockObjectResponse
    | Heading3BlockObjectResponse
}

export default function NotionHeading({ block }: Props) {
  switch (block.type) {
    case 'heading_1':
      return (
        <h2 className={`text-3xl text-white mb-8 mt-10`}>
          <NotionRichText rich_text={block.heading_1.rich_text} />
        </h2>
      )
    case 'heading_2':
      return (
        <h3 className={`text-2xl text-white mb-6 mt-10`}>
          <NotionRichText rich_text={block.heading_2.rich_text} />
        </h3>
      )
    case 'heading_3':
      return (
        <h4 className={`text-xl text-white mb-4 mt-8`}>
          <NotionRichText rich_text={block.heading_3.rich_text} />
        </h4>
      )
  }
}
