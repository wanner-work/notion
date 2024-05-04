import { AnnotationResponse } from '@notionhq/client/build/src/api-endpoints'

export default function getAnnotationClassNames(annotations: AnnotationResponse) {
  let className = ''

  if (annotations.bold) {
    className += 'font-bold '
  }
  if (annotations.code) {
    className += 'font-mono '
  }
  if (annotations.italic) {
    className += 'italic '
  }
  if (annotations.underline) {
    className += 'underline '
  }

  return className
}
