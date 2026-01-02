import {NotionParser, NotionQuery } from '@wanner.work/notion'

export default async function Home() {
  const query = new NotionQuery(process.env['NOTION-SECRET']!)

  const entries = await query.retrieveDatabaseEntries(process.env['NOTION-PLAYGROUND-DATABASE']!)

  return (
      <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="grid grid-cols-2 gap-3">
          {entries.filter(entry => entry.object === 'page').map((entry) => (
              <div key={entry.id} className="p-4 border border-gray-200 rounded mb-4">
                <p className="text-xs text-gray-400 mb-2">{entry.id}</p>
                <p className="text-sm text-gray-600">{NotionParser.getPageTitle(entry)}</p>
                <a href={NotionParser.getURLPageProperty(entry.properties, 'URL')} className="text-blue-500 text-sm break-all" target="_blank" rel="noreferrer">
                  {NotionParser.getURLPageProperty(entry.properties, 'URL')}
                </a>
                <hr className="opacity-10 mt-4" />
                <div className="mt-3">
                  {NotionParser.getMultiSelectPageProperty(entry.properties, 'Tags').map((tag) => (<p className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-1 mb-1" key={tag.id}>
                    {tag.name}
                  </p>))}
                </div>
              </div>
          ))}
        </div>
      </div>
  )
}
