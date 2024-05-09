import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import Image from '@wanner.work/image'
import getImageURL from '../../methods/data/getImageURL'
import NotionBlockObject from '../../interfaces/NotionBlockObject'

interface Props extends NotionBlockObject<ImageBlockObjectResponse> {}

export default function NotionImage({ block }: Props) {
  const src = getImageURL(block.image)

  return (
    <div className="h-[450px] w-full mb-5 relative">
      <Image src={src} alt="deger" fill loading="lazy" />
    </div>
  )
}
