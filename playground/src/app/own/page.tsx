import NotionCallout from '@/components/NotionCallout'
import NotionImage from '@/components/NotionImage'
import { Client } from '@notionhq/client'
import {
  PageObjectResponse,
  QueryDatabaseResponse
} from '@notionhq/client/build/src/api-endpoints'
import Notion, { NotionQuery } from '@wanner.work/notion'

export default async function Own() {
  const client = new Client({
    auth: process.env.NOTION_SECRET
  })

  const request = (await client.databases.query({
    database_id: '75b5561e028b4fa1bb54bf1acca761d2'
  })) as QueryDatabaseResponse
  const results = request.results as PageObjectResponse[]

  const page = results[0]

  const response = await client.blocks.children.list({
    block_id: page.id
  })

  const query = new NotionQuery(client)
  const data = await query.transform(response)

  return (
    <main className="bg-black">
      <div className="min-h-screen w-screen bg-black text-white">
        <div className="p-8">
          <Notion
            data={data}
            custom={[
              {
                type: 'callout',
                component: NotionCallout
              },
              {
                type: 'image',
                component: NotionImage
              }
            ]}
          />
        </div>
      </div>
    </main>
  )
}
