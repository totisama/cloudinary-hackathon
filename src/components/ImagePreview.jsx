import { useState } from 'react'
import { toast } from 'react-toastify'
import { ITEM_CLOUDINARY_NAME } from '../consts'

import { Cloudinary } from '@cloudinary/url-gen'
import { Transformation } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { source } from '@cloudinary/url-gen/actions/overlay'
import { byAngle } from '@cloudinary/url-gen/actions/rotate'
import {
  vignette,
  sepia,
  grayscale,
  oilPaint,
  cartoonify,
  blackwhite,
  negate,
  dither,
  vectorize,
  gradientFade,
  assistColorBlind,
  simulateColorBlind,
} from '@cloudinary/url-gen/actions/effect'
import { saturation, opacity } from '@cloudinary/url-gen/actions/adjust'
import { Position } from '@cloudinary/url-gen/qualifiers/position'
import { compass } from '@cloudinary/url-gen/qualifiers/gravity'
import { image, text } from '@cloudinary/url-gen/qualifiers/source'
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle'

export const ImagePreview = ({ processedImages, generalValues }) => {
  const [finalImageURL, setFinalImageURL] = useState('')
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'totisama',
    },
    url: {
      secure: true,
    },
  })

  const applyTransformations = (effect = '') => {
    const trans = new Transformation()

    // WIP: Support multiple effects
    if (effect.includes('VIGNETTE')) {
      trans.effect(vignette())
    }
    if (effect.includes('SEPIA')) {
      trans.effect(sepia())
    }
    if (effect.includes('GRAYSCALE')) {
      trans.effect(grayscale())
    }
    if (effect.includes('OILPAINT')) {
      trans.effect(oilPaint())
    }
    if (effect.includes('CARTOONIFY')) {
      trans.effect(cartoonify())
    }
    if (effect.includes('BLACK_WHITE')) {
      trans.effect(blackwhite())
    }
    if (effect.includes('NEGATE')) {
      trans.effect(negate())
    }
    if (effect.includes('DITHER')) {
      trans.effect(dither())
    }
    if (effect.includes('VECTORIZE')) {
      trans.effect(vectorize())
    }
    if (effect.includes('GRADIENT_FADE')) {
      trans.effect(gradientFade())
    }
    if (effect.includes('ASSIST_COLOR_BLIND')) {
      trans.effect(assistColorBlind())
    }
    if (effect.includes('SIMULATE_COLOR_BLIND')) {
      trans.effect(simulateColorBlind())
    }

    return trans
  }

  const processImage = () => {
    const {
      image: imageValues,
      background: backgoundValues,
      texts,
      items,
    } = generalValues
    const selectedImage = processedImages.find((image) => image.selected)
    const notSelectedImage = processedImages.find((image) => !image.selected)

    if (processedImages.length < 2) {
      toast.error('You need two images')

      return
    }

    if (!selectedImage) {
      toast.error('You need to select an image')

      return
    }

    if (!imageValues.yPosition || !imageValues.xPosition) {
      toast.error('You need to set a position for the image')

      return
    }

    if (!imageValues.size) {
      toast.error('You need to set a size for the image')

      return
    }

    if (imageValues.size <= 0) {
      toast.error('Size needs to be greater than 0')

      return
    }

    const myImage = cloudinary
      .image(selectedImage.publicId)
      .addTransformation(applyTransformations(backgoundValues.effect))
    const trans = applyTransformations(imageValues.effect)

    trans.resize(scale().width(imageValues.size * 3))

    myImage.overlay(
      source(image(notSelectedImage.publicId).transformation(trans)).position(
        new Position()
          .gravity(compass('center'))
          .offsetY(
            imageValues.yPosition.includes('-')
              ? -imageValues.yPosition
              : -Math.abs(imageValues.yPosition)
          )
          .offsetX(imageValues.xPosition)
      )
    )

    texts.forEach((textObject) => {
      myImage.overlay(
        source(
          text(
            textObject.text,
            new TextStyle('arial', textObject.size).fontWeight('bold')
          )
            .textColor(textObject.color)
            .transformation(
              new Transformation()
                .adjust(opacity(textObject.opacity))
                .rotate(byAngle(textObject.rotation))
            )
        ).position(
          new Position()
            .gravity(compass('center'))
            .offsetY(
              textObject.yPosition.includes('-')
                ? -textObject.yPosition
                : -Math.abs(textObject.yPosition)
            )
            .offsetX(textObject.xPosition)
        )
      )
    })

    items.forEach((itemObject) => {
      myImage.overlay(
        source(
          image(ITEM_CLOUDINARY_NAME[itemObject.item]).transformation(
            new Transformation()
              .adjust(opacity(itemObject.opacity))
              .rotate(byAngle(itemObject.rotation))
              .adjust(saturation(100))
              .resize(scale().width(itemObject.size * 3))
          )
        ).position(
          new Position()
            .gravity(compass('center'))
            .offsetY(
              itemObject.yPosition.includes('-')
                ? -itemObject.yPosition
                : -Math.abs(itemObject.yPosition)
            )
            .offsetX(itemObject.xPosition)
        )
      )
    })

    setFinalImageURL(myImage.toURL())
  }

  return (
    <section className="max-w-xl m-auto grid grid-cols-1 w-full mt-16">
      <div className="flex justify-center mb-4">
        <img src={finalImageURL} style={{ maxWidth: '350px' }} />
      </div>
      <div className="flex flex-row justify-center gap-8">
        <button
          onClick={() => {
            processImage()
          }}
          className="bg-green-600 text-md sm:text-xl text-center font-bold text-white rounded-full px-4 py-2"
        >
          Preview Image
        </button>
        {finalImageURL ? (
          <a
            target="_blank"
            download
            href={finalImageURL}
            className="block bg-blue-600 text-md sm:text-xl text-center font-bold text-white rounded-full px-4 py-2"
          >
            Download image
          </a>
        ) : null}
      </div>
    </section>
  )
}
