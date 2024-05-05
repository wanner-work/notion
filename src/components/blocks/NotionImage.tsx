import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import NotionBlockProps from '../../interfaces/NotionBlockProps'
import Image from '@wanner.work/image'
import getImageURL from '../../methods/data/getImageURL'

interface Props extends NotionBlockProps<ImageBlockObjectResponse> {}

export default function NotionImage({ block, nested }: Props) {
  const src = getImageURL(block.image)

  return (
    <div className="h-[450px] w-full mb-5 relative">
      <Image src={src} alt="deger" fill loading="lazy" />
    </div>
  )
}
