import { useState } from 'react'
import { toast } from 'react-toastify'
import { SIZE_OFFSET, IMAGE_SIZE, OFFSET_SIGN } from '../consts'

import { Cloudinary } from '@cloudinary/url-gen'
import { Transformation } from '@cloudinary/url-gen'
import { scale, fill, crop } from '@cloudinary/url-gen/actions/resize'
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
import { byRadius, max } from '@cloudinary/url-gen/actions/roundCorners'
import { saturation, hue } from '@cloudinary/url-gen/actions/adjust'
import { Position } from '@cloudinary/url-gen/qualifiers/position'
import { compass } from '@cloudinary/url-gen/qualifiers/gravity'
import { image, text } from '@cloudinary/url-gen/qualifiers/source'
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn'

export const ImagePreview = ({ processedImages, inputsValue }) => {
  const [finalImageURL, setFinalImageURL] = useState('')
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'totisama',
    },
    url: {
      secure: true,
    },
  })

  const calculatePosition = (imageValues, backgoundImage, imageType) => {
    const { position, size } = imageValues
    const { width, height } = backgoundImage
    const sizeOffset = SIZE_OFFSET[imageType][size]
    const posi = new Position()

    let xOffset = Math.floor(width / 2 - sizeOffset.x)
    let yOffset = Math.floor(height / 2 - sizeOffset.y)

    xOffset = OFFSET_SIGN[position].x + xOffset
    yOffset = OFFSET_SIGN[position].y + yOffset

    if (position === 'TOP_CENTER' || position === 'BOTTOM_CENTER') {
      xOffset = 0
    }

    if (position === 'CENTER_LEFT' || position === 'CENTER_RIGHT') {
      yOffset = 0
    }

    if (position === 'CENTER') {
      xOffset = 0
      yOffset = 0
    }

    posi.gravity(compass('center')).offsetX(xOffset).offsetY(yOffset)

    return posi
  }

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

  const applyAdjusts = (trans, imageValues) => {
    const { size } = imageValues

    trans.adjust(saturation(100)).resize(scale().width(IMAGE_SIZE[size]))

    return trans
  }

  const processImage = () => {
    const { image: imageValues, background: backgoundValues } = inputsValue
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

    if (!imageValues.position) {
      toast.error('You need to chose a position for the image')

      return
    }

    if (!imageValues.size) {
      toast.error('You need to chose a size for the image')

      return
    }

    const myImage = cloudinary
      .image(selectedImage.publicId)
      .addTransformation(applyTransformations(backgoundValues.effect))

    const { width, height } = notSelectedImage
    let type = 'SQUARED'

    if (width > height) {
      type = 'HORIZONTAL'
    } else if (height > width) {
      type = 'VERTICAL'
    }

    const position = calculatePosition(imageValues, selectedImage, type)
    let trans = applyTransformations(imageValues.effect)

    trans = applyAdjusts(trans, imageValues)

    myImage.overlay(
      source(image(notSelectedImage.publicId).transformation(trans)).position(
        position
      )
    )

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
          className="bg-green-600 text-xl text-center font-bold text-white rounded-full px-4 py-2"
        >
          Preview Image
        </button>
        {finalImageURL ? (
          <a
            target="_blank"
            download
            href={finalImageURL}
            className="block bg-blue-600 text-xl text-center font-bold text-white rounded-full px-4 py-2"
          >
            Download image
          </a>
        ) : null}
      </div>
    </section>
  )
}
