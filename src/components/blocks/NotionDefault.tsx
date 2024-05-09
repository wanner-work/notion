import NotionBlockObject from '../../interfaces/NotionBlockObject'

export default function NotionDefault({ block }: NotionBlockObject) {
  return (
    <div className="bg-red-600/20 p-5 mt-5 text-red-500 font-mono rounded text-sm">
      <p className="font-bold mb-2">Unsuported type</p>
      <p className="mb-2">
        The block type <span className="p-1 bg-black/40 text-white/70 text-[12px] rounded">{block.type}</span> is currently not supported by <span
        className="p-1 bg-black/40 text-white/70 text-[12px] rounded">@wanner.work/notion</span>. But you can still render it by creating a custom
        component.
      </p>
      <p>
        See <a className="underline" href="">https://github.com/wanner-work/notion/</a> for more information on how to
        create and integrate custom components.
      </p>
    </div>
  )
}
