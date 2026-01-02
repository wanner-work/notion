import Notion, { NotionQuery, NotionParser } from '@wanner.work/notion'
import notionConfig from "@/notion.config";

export default async function Home() {
  const query = new NotionQuery(process.env['NOTION-SECRET']!)

  const {
    page,
    data
  } = await query.retrievePage(process.env['NOTION-PLAYGROUND-PAGE']!)

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <article className="prose prose-neutral lg:prose-xl">
        <h1>
          {NotionParser.getPageTitle(page)}
        </h1>
        <Notion data={data} config={notionConfig} />
      </article>
    </div>
  )
}
