import {
  ImageBlockObjectResponse,
  PageObjectResponse
} from '@notionhq/client/build/src/api-endpoints'

export default function getImageURL(
  image: ImageBlockObjectResponse['image'] | PageObjectResponse['cover']
) {
  if (image?.type === 'external') {
    return image.external.url
  } else if (image?.type === 'file') {
    return image.file.url
  } else {
    return '/coming-soon.jpg'
  }
}
