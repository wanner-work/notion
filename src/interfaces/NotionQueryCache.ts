import {
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints'

export default interface NotionQueryCache {
  timestamp: number;
  data: ListBlockChildrenResponse;
}