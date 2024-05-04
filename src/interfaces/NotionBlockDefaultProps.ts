import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export default interface NotionBlockDefaultProps {
  block: BlockObjectResponse
  nested?: boolean
}