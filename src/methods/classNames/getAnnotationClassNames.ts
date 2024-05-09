import NotionAnnotations from '../../interfaces/NotionAnnotations'

export default function getAnnotationClassNames(annotations: NotionAnnotations) {
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
