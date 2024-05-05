import { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import NotionBlockProps from '../../interfaces/NotionBlockProps'
import NotionRichText from '../common/NotionRichText'

interface Props extends NotionBlockProps<ParagraphBlockObjectResponse> {}

export default function NotionParagraph({ block }: Props) {
  return (
    <p className="mb-5 leading-6 font-light text-base text-light tracking-wider">
      <NotionRichText rich_text={block.paragraph.rich_text} />
    </p>
  )
}
