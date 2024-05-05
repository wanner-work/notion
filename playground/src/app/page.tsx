import Notion, { NotionQuery } from '@wanner.work/notion'

export default async function Home() {
  const query = new NotionQuery('bf502a532e2a401ab1c76accc12810f1', 'secret_K9hQzPOdQmQuc2idrZML76jvYn5dYAGBXPCmelkIfCe', {
    cacheMaxAge: 1000 * 60 * 60,
    debug: true
  })

  const data = await query.execute()

  return (
    <main className="bg-black">
      <div className="min-h-screen w-screen bg-black text-white">
        <div className="px-8">
          <Notion data={data} />
        </div>
      </div>
    </main>
  );
}
