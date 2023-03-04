import { useState } from 'react'
import { Dropzone } from './Dropzone'
import { API_URL } from '../consts'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

export const CombineImages = () => {
  const [processedImages, setProcessedImages] = useState([])
  const [finalImageURL, setFinalImageURL] = useState('')
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'totisama',
    },
    url: {
      secure: true,
    },
  })

  const uploadImages = async (images) => {
    const actualImages = processedImages

    for (let i = 0; i < images.length; i++) {
      const formData = new FormData()
      const image = images[i]

      formData.append('file', image)
      formData.append('upload_preset', 'hackathon')
      formData.append('timestamp', Date.now() / 1000)
      // this is not the secret api key
      formData.append('api_key', 976248287242189)

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      const {
        format,
        original_filename: imageName,
        public_id: publicId,
        height,
        width,
      } = data

      const imageObject = {
        name: imageName,
        publicId,
        format,
        height,
        width,
        selected: false,
      }

      actualImages.push(imageObject)
    }

    setProcessedImages(actualImages)
  }

  const selectImage = (name) => {
    const newImages = []

    processedImages.forEach((image) => {
      image.selected = image.name === name

      newImages.push(image)
    })

    setProcessedImages(newImages)
  }

  const processImage = () => {
    const selectedImage = processedImages.find((image) => image.selected)
    const notSelectedImage = processedImages.find((image) => !image.selected)

    if (!selectedImage) {
      toast.error('You need to select an image')
      return
    }

    const myImage = cloudinary.image(selectedImage.publicId).overlay(
      source(
        image(notSelectedImage.publicId).transformation(
          new Transformation()
            .resize(
              crop()
                .width(1.3)
                .height(1.3)
                .gravity(focusOn(FocusOn.faces()))
                .regionRelative()
            )
            .adjust(saturation(50))
            .effect(vignette())
            .resize(scale().width(100))
            .roundCorners(max())
        )
      ).position(
        new Position().gravity(compass('center')).offsetX(-20).offsetY(20)
      )
    )

    setFinalImageURL(myImage.toURL())
  }

  return (
    <>
      <Dropzone uploadImages={uploadImages} selectImage={selectImage} />
      <section className="max-w-xl m-auto grid grid-cols-1 w-full mt-16">
        <div className="flex justify-center mb-10">
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
      <section className="mt-10">
        <p className="text-3xl">Custom not selected image</p>
        <div className="grid grid-cols-2 gap-6 mt-5">
          <div className="grid grid-cols-3">
            <p className="text-xl col-span-1">Position:</p>
            <select
              name="position"
              id="position"
              // onChange={}
              // value={}
              className="w-full col-span-2 py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-naranja focus:border-naranja sm:text-sm"
            >
              <option key="test" value="test">
                test
              </option>
            </select>
          </div>
          <div className="grid grid-cols-3">
            <p className="text-xl col-span-1">Style:</p>
            <select
              name="style"
              id="style"
              // onChange={}
              // value={}
              className="w-full col-span-2 py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-naranja focus:border-naranja sm:text-sm"
            >
              <option key="test" value="test">
                test
              </option>
            </select>
          </div>
        </div>
      </section>
      <section className="mt-10 grid grid-cols-2 gap-6">
        <div className="flex flex-row gap-5">
          <p className="text-3xl">Items</p>
          <button className="bg-blue-600 text-white p-1 rounded-md">
            Add Item <span>➕</span>
          </button>
        </div>
        <div className="flex flex-row gap-5">
          <p className="text-3xl">Texts</p>
          <button className="bg-blue-600 text-white p-1 rounded-md">
            Add Text <span>➕</span>
          </button>
        </div>
      </section>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        newestOnTop={true}
        closeOnClick={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </>
  )
}
