'use client'

import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import Image from '@wanner.work/image'
import { useCallback, useState } from 'react'
import type { NotionBlockObject } from '@wanner.work/notion'
import { getNotionImageURL } from '@wanner.work/notion/helper'

export default function NotionImage({ block, level }: NotionBlockObject<ImageBlockObjectResponse>) {
  const [showGraphicImage, setShowGraphicImage] = useState(false)

  let className = ''
  let isGraphic = false

  const caption = block.image?.caption[0]?.plain_text

  if (caption === 'wide') {
    className += `h-[300px] -mx-[32px] w-[calc(100%+64px)] md:h-[400px] md:-mx-[58px] md:w-[calc(100%+116px)] mt-12 ${level !== 0 && 'mb-12'}`
  } else if (caption === 'tight') {
    className += `h-[280px] mt-12 ${level !== 0 && 'mb-12'} w-full`
  } else if (caption === 'high') {
    className += `h-[500px] md:h-[800px] mt-12 ${level !== 0 && 'mb-12'} w-full`
  } else {
    className += `h-[450px] mt-12 ${level !== 0 && 'mb-12'} w-full`
  }

  if (caption === 'graphic') {
    isGraphic = true
  }

  const show = useCallback(() => {
    setShowGraphicImage(true)
  }, [setShowGraphicImage])

  return (
    <div className={`${className} relative`}>
      {isGraphic && !showGraphicImage && (
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-2xl z-20 flex items-end  text-white">
          <div className="p-8">
            <h3 className="mb-2 text-xl">Warnung</h3>
            <p className="text-light mb-4">
              Dieses Bild enthält Inhalt, welcher auf gewisse Personen
              verstörend wirken kann. Klicke auf den untenstehenden Button, um
              es trotzdem anzuzeigen.
            </p>
            <button
              className="text-sm bg-white text-black px-3 py-2 font-bold"
              onClick={show}
            >
              Bild anzeigen
            </button>
          </div>
        </div>
      )}

      <Image src={getNotionImageURL(block.image)} alt={'Notion Image'} fill />
    </div>
  )
}
