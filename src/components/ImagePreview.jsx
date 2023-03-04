import { useState } from 'react'
import { toast } from 'react-toastify'
import { SIZE_OFFSET, IMAGE_SIZE, OFFSET_SIGN } from '../consts'

import { Cloudinary } from '@cloudinary/url-gen'
import { Transformation } from '@cloudinary/url-gen'
import { scale, fill, crop } from '@cloudinary/url-gen/actions/resize'
import { source } from '@cloudinary/url-gen/actions/overlay'
import { byAngle } from '@cloudinary/url-gen/actions/rotate'
import { vignette } from '@cloudinary/url-gen/actions/effect'
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

  const calculatePosition = (imageValues, backgoundImage) => {
    const { position, size } = imageValues
    const { width, height } = backgoundImage
    const sizeOffset = SIZE_OFFSET[size]
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

  const applyTransformations = (imageValues) => {
    const { size, style } = imageValues
    const trans = new Transformation()

    if (true) {
      trans.adjust(saturation(50))
    }

    if (true) {
      trans
        .effect(vignette())
        .resize(scale().width(IMAGE_SIZE[size]))
        .roundCorners(max())
    }

    return trans
  }

  const processImage = () => {
    const { image: imageValues } = inputsValue
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

    if (!imageValues.style) {
      toast.error('You need to add a style to the image')

      return
    }

    const position = calculatePosition(imageValues, selectedImage)
    const trans = applyTransformations(imageValues)

    const myImage = cloudinary
      .image(selectedImage.publicId)
      .overlay(
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
