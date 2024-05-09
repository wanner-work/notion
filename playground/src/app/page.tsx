import NotionCallout from '@/components/NotionCallout'
import NotionImage from '@/components/NotionImage'
import Notion, { NotionQuery } from '@wanner.work/notion'

export default async function Home() {
  const query = new NotionQuery(process.env.NOTION_SECRET as string, {
    debug: true
  })

  const data = await query.execute('8445e68437d8417fadf6040cb32f6570')

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
