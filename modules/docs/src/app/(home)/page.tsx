import NotionLogo from '@/components/logos/NotionLogo'
import ReactLogo from '@/components/logos/ReactLogo'

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center text-center flex-1">
      <div className="flex flex-wrap gap-3 items-center mb-2">
        <span className="text-3xl font-medium">Render</span>
        <div className="flex gap-3 bg-neutral-50 dark:bg-neutral-900 rounded-3xl shadow-2xl dark:shadow-neutral-900 p-4 items-center text-xl font-medium -rotate-3">
          <NotionLogo size={32} />
          Notion
        </div>
        <span className="text-3xl font-medium">With</span>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-3xl font-medium">Your</span>
        <div className="flex gap-3 bg-neutral-50 dark:bg-neutral-900 rounded-3xl shadow-2xl dark:shadow-neutral-900 p-4 items-center text-xl font-medium -rotate-3">
          <ReactLogo size={32} />
          React
        </div>
        <span className="text-3xl font-medium">Components</span>
      </div>

      <div className="mt-12">
        <p className="max-w-64 text-neutral-600 dark:text-neutral-400">
          The {'>'}7KB, all-in-one toolkit to build React applications using Notion as your CMS.
        </p>
      </div>

      <div className="mt-12 flex gap-3">
        <a
          href="/docs"
          className="rounded-full bg-neutral-950 dark:bg-neutral-50 text-white dark:text-black px-5 py-3 font-medium"
        >
          Documentation
        </a>
      </div>
    </div>
  )
}
