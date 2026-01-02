import Notion, { NotionQuery, NotionParser } from '@wanner.work/notion'
import notionConfig from '@/notion.config'
import {notFound} from "next/dist/client/components/not-found";

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function DatabaseEntry({ params}: Props) {
  const { slug } = await params;

  const query = new NotionQuery(process.env['NOTION-SECRET']!, {
    debug: true
  })

  const entries = await query.retrieveDatabaseEntries(process.env['NOTION-PLAYGROUND-DATABASE']!, {
    filter: {
      "and": [
        {
          "property": "Slug",
          "rich_text": {
            "equals": slug
          }
        }
      ]
    }
  })

  const page = entries.find((entry) => entry.object === 'page')
  if (!page) {
    return notFound()
  }

  const data = await query.retrievePageData(page.id)

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <article className="prose prose-neutral">
        <h1>{NotionParser.getPageTitle(page)}</h1>
        <Notion data={data} config={notionConfig} />
      </article>
    </div>
  )
}
