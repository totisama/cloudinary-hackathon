import { useState } from 'react'
import { Dropzone } from './Dropzone'
import {
  API_URL,
  POSITIONS as positions,
  EFFECTS as effects,
  SIZES as sizes,
  DEFAULT_VALUES,
} from '../consts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ImagePreview } from './ImagePreview'
import Select from 'react-select'

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    padding: 5,
    fontFamily: 'Avenir',
    fontWeight: 'Bold',
  }),
  container: (provided, state) => ({
    ...provided,
    height: 'auto',
    width: '100%',
  }),
}

export const CombineImages = () => {
  const [processedImages, setProcessedImages] = useState([])
  const [inputsValue, setInputsValue] = useState(DEFAULT_VALUES)

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

  const updateValues = (event, type) => {
    const values = inputsValue
    const property = event.target.name

    if (type === 'IMAGE') {
      values['image'][property] = event.target.value
    }

    if (type === 'BACKGROUND') {
      values['background'][property] = event.target.value
    }

    setInputsValue(values)
  }

  const updateEffectValues = (selectedValues, type) => {
    const values = inputsValue
    const newValues = selectedValues.map((value) => {
      return value.value
    })

    values[type]['effect'] = newValues
    setInputsValue(values)
  }

  return (
    <>
      <Dropzone uploadImages={uploadImages} selectImage={selectImage} />
      {processedImages.length > 0 ? (
        <ImagePreview
          processedImages={processedImages}
          inputsValue={inputsValue}
        />
      ) : null}
      <section className="mt-10">
        <p className="text-3xl">Custom not selected image</p>
        <div className="grid grid-cols-2 gap-6 mt-5">
          <div className="grid grid-cols-3">
            <p className="text-xl col-span-1">Position:</p>
            <select
              name="position"
              id="position"
              onChange={(e) => updateValues(e, 'IMAGE')}
              className="w-full col-span-2 py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
            >
              {positions.map((position) => (
                <option key={position.value} value={position.value}>
                  {position.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-3">
            <p className="text-xl col-span-1">Size:</p>
            <select
              name="size"
              id="size"
              onChange={(e) => updateValues(e, 'IMAGE')}
              className="w-full col-span-2 py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
            >
              {sizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 mt-5">
          <div className="flex col-span-2 gap-6">
            <p className="text-xl col-span-1">Effect:</p>
            <Select
              isMulti
              closeMenuOnSelect={false}
              name="effect"
              options={effects}
              placeholder="Select options"
              maxHeight={10}
              styles={customStyles}
              className="col-span-3 p-1 bg-white rounded-md shadow-sm focus:outline-none"
              onChange={(values) => updateEffectValues(values, 'image')}
            />
          </div>
        </div>
      </section>
      <section className="mt-10 w-2/3">
        <p className="text-3xl">Add effect to background</p>
        <div className="flex gap-6 mt-5">
          <p className="text-xl">Effect:</p>
          <Select
            isMulti
            closeMenuOnSelect={false}
            name="effect"
            options={effects}
            placeholder="Select options"
            styles={customStyles}
            className="col-span-3 p-1 bg-white rounded-md shadow-sm focus:outline-none"
            onChange={(values) => updateEffectValues(values, 'background')}
          />
        </div>
      </section>
      {/* <section className="mt-10 grid grid-cols-2 gap-6">
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
      </section> */}
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
