import { hash } from 'ohash'
import { Fragment } from 'react'
import { RichTextItemResponse } from '@notionhq/client'
import NotionRichTextAnnotations from './NotionRichTextAnnotations'

interface Props {
  rich_text: RichTextItemResponse[]
}

export default function NotionRichText({ rich_text }: Readonly<Props>) {
  return rich_text.map((text, index) => (
    <Fragment key={hash({ text, index })}>
      {text.type === 'text' && (
        <>
          {text.text.link ? (
            <a href={text.text.link.url} target="_blank" rel="no-refferer">
              <NotionRichTextAnnotations rich_text={text} />
            </a>
          ) : (
            <NotionRichTextAnnotations rich_text={text} />
          )}
        </>
      )}
    </Fragment>
  ))
}
