import { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import NotionBlockObject from '../../interfaces/NotionBlockObject'
import NotionRichText from '../common/NotionRichText'

interface Props extends NotionBlockObject<ParagraphBlockObjectResponse> {}

export default function NotionParagraph({ block }: Props) {
  return (
    <p className="mb-5 leading-6 font-light text-base text-white/70 tracking-wider">
      <NotionRichText rich_text={block.paragraph.rich_text} />
    </p>
  )
}
