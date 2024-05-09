import { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import NotionRichText from '../common/NotionRichText'
import NotionBlockObject from '../../interfaces/NotionBlockObject'

interface Props extends NotionBlockObject<ParagraphBlockObjectResponse> {}

export default function NotionParagraph({ block }: Props) {
  return (
    <p className="mb-5 leading-6 font-light text-base text-light tracking-wider">
      <NotionRichText rich_text={block.paragraph.rich_text} />
    </p>
  )
}
