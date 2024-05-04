import NotionBlockDefaultProps from '../interfaces/NotionBlockDefaultProps'

export default function NotionBlock ({ block, nested }: NotionBlockDefaultProps) {
  switch (block.type) {
    default:
      return (
        <>
          <div>default</div>
          <div className="bg-white/20 p-4 mt-4">{JSON.stringify(block)}</div>
        </>
      )
  }
}