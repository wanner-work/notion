import { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import NotionBlockObject from '../../interfaces/NotionBlockObject'
import NotionRichText from '../common/NotionRichText'

export default function NotionParagraph({
  block
}: Readonly<NotionBlockObject<ParagraphBlockObjectResponse>>) {
  return (
    <p>
      <NotionRichText rich_text={block.paragraph.rich_text} />
    </p>
  )
}
