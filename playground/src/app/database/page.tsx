import { NotionParser, NotionQuery, NotionRichText } from '@wanner.work/notion'
import Link from "next/dist/client/link";

export default async function Database() {
  const query = new NotionQuery(process.env['NOTION-SECRET']!, {
    debug: true
  })

  const {
    database,
    entries
  } = await query.retrieveDatabase(process.env['NOTION-PLAYGROUND-DATABASE']!)
  const pages = entries.filter((entry) => entry.object === 'page')

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <article className="prose prose-neutral">
        <h1>{NotionParser.getDatabaseTitle(database)}</h1>
        <NotionRichText rich_text={database.description} />
      </article>
      <div className="grid grid-cols-2 gap-3 mt-12">
        {pages.map((page) => (
            <article key={page.id} className="p-4 border border-gray-200 rounded mb-4">
              <p className="text-xs text-gray-400 mb-2">{page.id}</p>
              <p className="text-sm text-gray-600">{NotionParser.getPageTitle(page)}</p>
              <a
                href={NotionParser.getURLPageProperty(page.properties, 'URL')}
                className="text-blue-500 text-sm break-all"
                target="_blank"
                rel="noreferrer"
              >
                {NotionParser.getURLPageProperty(page.properties, 'URL')}
              </a>
              <hr className="opacity-10 mt-4" />
              <div className="mt-3">
                {NotionParser.getMultiSelectPageProperty(page.properties, 'Tags').map((tag) => (
                  <p
                    className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-1 mb-1"
                    key={tag.id}
                  >
                    {tag.name}
                  </p>
                ))}
              </div>
              <hr className="opacity-10 mt-3" />
              <Link href={'/database/' + NotionParser.getPlainTextPageProperty(page.properties, 'Slug')} className="w-full">
                <button className=" mt-4 bg-gray-200  px-3 py-1 rounded text-sm w-full">
                  View Page
                </button>
              </Link>
            </article>
          ))}
      </div>
    </div>
  )
}
