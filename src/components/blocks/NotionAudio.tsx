import { AudioBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import NotionBlockObject from '../../interfaces/NotionBlockObject'

interface Props extends NotionBlockObject<AudioBlockObjectResponse> {}

export default function NotionAudio({ block }: Props) {
  return (
    <p className="mt-12 mb-12 w-full">
      <audio
        className="w-full"
        controls
        src={(block.audio.type === 'file' && block.audio.file.url) || ''}
      />
    </p>
  )
}
