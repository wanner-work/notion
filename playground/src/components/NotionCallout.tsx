import type { NotionBlockObject } from '@wanner.work/notion'
import { CalloutBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export default function NotionCallout ({ block, children }: NotionBlockObject<CalloutBlockObjectResponse>) {
  return <div>
    Hallo {children?.length} {children?.map(child => child.block?.type).join(', ')}
  </div>
}