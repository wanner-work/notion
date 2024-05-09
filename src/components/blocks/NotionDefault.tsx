import NotionBlockObject from '../../interfaces/NotionBlockObject'

export default function NotionDefault({ block }: NotionBlockObject) {
  return (
    <div className="bg-amber-300/20 p-5 mt-5 text-amber-300 font-mono rounded">
      <p className="font-bold mb-3">Unsuported type</p>
      <p className="mb-1 text-sm">
        The block type{' '}
        <span className="p-1 bg-black/40 text-white/70 text-[12px] rounded">
          {block.type}
        </span>{' '}
        is currently not supported by{' '}
        <span className="p-1 bg-black/40 text-white/70 text-[12px] rounded">
          @wanner.work/notion
        </span>
        . But you can still render it by creating a custom component.
      </p>
      <p className="text-sm">
        See{' '}
        <a
          className="underline"
          href="https://github.com/wanner-work/notion?tab=readme-ov-file#customizing-the-rendering-of-the-blocks"
          target="_blank"
        >
          https://github.com/wanner-work/notion?tab=readme-ov-file#customizing-the-rendering-of-the-blocks
        </a>{' '}
        for more information on how to create and integrate custom components.
      </p>
    </div>
  )
}
