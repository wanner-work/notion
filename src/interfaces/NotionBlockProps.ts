import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export default interface NotionBlockProps {
  block: BlockObjectResponse
  nested?: boolean
}