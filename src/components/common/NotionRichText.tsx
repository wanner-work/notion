import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import getAnnotationClassNames from '../../methods/classNames/getAnnotationClassNames'

interface Props {
  rich_text: RichTextItemResponse[]
}

export default function NotionRichText({ rich_text }: Props) {
  return (
    <>
      {rich_text.map((text) => (
        <>
          {text.type === 'text' && (
            <>
              {text.text.link ? (
                <a href={text.text.link.url} target="_blank" rel="no-refferer">
                  <span
                    className={`${getAnnotationClassNames(text.annotations)} underline`}
                  >
                    {text.text.content}
                  </span>
                </a>
              ) : (
                <span className={getAnnotationClassNames(text.annotations)}>
                  {text.text.content}
                </span>
              )}
            </>
          )}
        </>
      ))}
    </>
  )
}
