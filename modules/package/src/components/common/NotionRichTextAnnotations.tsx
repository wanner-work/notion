import { RichTextItemResponse, TextRichTextItemResponse } from '@notionhq/client'
import { ReactNode } from 'react'

interface Props {
  readonly rich_text: RichTextItemResponse & TextRichTextItemResponse
}

export default function NotionRichTextAnnotations({ rich_text: { annotations, text } }: Props) {
  let content: ReactNode = text.content

  if (annotations.code) {
    content = <code>{content}</code>
  }

  if (annotations.bold) {
    content = <b>{content}</b>
  }

  if (annotations.italic) {
    content = <i>{content}</i>
  }

  if (annotations.underline) {
    content = <u>{content}</u>
  }

  if (annotations.strikethrough) {
    content = <s>{content}</s>
  }

  return <>{content}</>
}
