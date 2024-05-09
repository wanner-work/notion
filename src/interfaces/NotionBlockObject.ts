import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export default interface NotionBlockObject<T = BlockObjectResponse> {
  block: T
  children?: NotionBlockObject[]
  level?: number
}