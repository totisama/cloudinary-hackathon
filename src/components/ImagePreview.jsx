import { useState } from 'react'
import { toast } from 'react-toastify'

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

export const ImagePreview = ({ processedImages }) => {
  const [finalImageURL, setFinalImageURL] = useState('')
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'totisama',
    },
    url: {
      secure: true,
    },
  })

  const processImage = () => {
    console.log('entra')
    const selectedImage = processedImages.find((image) => image.selected)
    const notSelectedImage = processedImages.find((image) => !image.selected)

    if (!selectedImage) {
      toast.error('You need to select an image')
      return
    }

    const trans = new Transformation()

    if (true) {
      trans.resize(
        crop()
          .width(1.3)
          .height(1.3)
          .gravity(focusOn(FocusOn.faces()))
          .regionRelative()
      )
    }
    if (true) {
      trans.adjust(saturation(50))
    }
    if (true) {
      trans.effect(vignette()).resize(scale().width(100)).roundCorners(max())
    }

    const myImage = cloudinary.image(selectedImage.publicId).overlay(
      source(image(notSelectedImage.publicId).transformation(trans)).position(
        new Position().gravity(compass('center')).offsetX(-20).offsetY(20)
      )
      // source(
      //   image(notSelectedImage.publicId).transformation(
      //     new Transformation()
      //       .resize(
      //         crop()
      //           .width(1.3)
      //           .height(1.3)
      //           .gravity(focusOn(FocusOn.faces()))
      //           .regionRelative()
      //       )
      //       .adjust(saturation(50))
      //       .effect(vignette())
      //       .resize(scale().width(100))
      //       .roundCorners(max())
      //   )
      // ).position(
      //   new Position().gravity(compass('center')).offsetX(-20).offsetY(20)
      // )
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
