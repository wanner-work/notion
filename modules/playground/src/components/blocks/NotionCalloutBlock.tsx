import { CalloutBlockObjectResponse } from '@notionhq/client'
import { NotionBlockObject, NotionRichText } from '@wanner.work/notion'

export default function NotionCalloutBlock({
  block
}: Readonly<NotionBlockObject<CalloutBlockObjectResponse>>) {
  return (
    <div className="mb-5 mt-6 rounded-xl bg-neutral-100 px-6 py-4 font-light text-black">
      <NotionRichText rich_text={block.callout.rich_text} />
    </div>
  )
}
