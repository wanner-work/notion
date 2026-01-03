import NotionBlockObject from '../../interfaces/NotionBlockObject'

export default function NotionDefault({ block, config }: Readonly<NotionBlockObject>) {
  if (config.hideUnsupportedBlockWarning) {
    return null
  }

  return (
    <div
      style={{
        border: '1px solid #e3e3e3',
        padding: '1rem',
        borderRadius: '0.5rem',
        backgroundColor: '#f8f8f8'
      }}
    >
      <p
        style={{
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: 0,
          marginBottom: '6px'
        }}
      >
        Unsupported type:{' '}
        <span
          style={{
            fontStyle: 'italic'
          }}
        >
          {block.type}
        </span>
      </p>
      <p
        style={{
          fontSize: '14px',
          marginTop: 0,
          marginBottom: '6px'
        }}
      >
        The block type <span>{block.type}</span> is currently not supported by{' '}
        <span>@wanner.work/notion</span>. But you can still render it by creating a custom
        component.
      </p>
      <p
        style={{
          fontSize: '14px',
          marginTop: 0,
          marginBottom: 0
        }}
      >
        See{' '}
        <a href="https://notion.wanner.work/docs/custom-components" target="_blank">
          https://notion.wanner.work/docs/custom-components
        </a>{' '}
        for more information on how to create and integrate custom components or how to disable this
        message.
      </p>
    </div>
  )
}
