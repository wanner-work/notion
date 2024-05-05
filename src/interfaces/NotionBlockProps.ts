import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export default interface NotionBlockProps<T = BlockObjectResponse> {
  block: T
  nested?: boolean
}