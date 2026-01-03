import {
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints'
import NotionBlockObject from '../../interfaces/NotionBlockObject'
import NotionRichText from '../common/NotionRichText'

export default function NotionHeading({
  block
}: Readonly<
  NotionBlockObject<
    Heading1BlockObjectResponse | Heading2BlockObjectResponse | Heading3BlockObjectResponse
  >
>) {
  switch (block.type) {
    case 'heading_1':
      return (
        <h1>
          <NotionRichText rich_text={block.heading_1.rich_text} />
        </h1>
      )
    case 'heading_2':
      return (
        <h2>
          <NotionRichText rich_text={block.heading_2.rich_text} />
        </h2>
      )
    case 'heading_3':
      return (
        <h3>
          <NotionRichText rich_text={block.heading_3.rich_text} />
        </h3>
      )
  }
}
