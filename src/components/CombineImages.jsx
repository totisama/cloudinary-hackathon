import { useState } from 'react'
import { Dropzone } from './Dropzone'
import {
  API_URL,
  EFFECTS as effects,
  DEFAULT_VALUES,
} from '../consts'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ImagePreview } from './ImagePreview'
import { Text } from './Text'
import Select from 'react-select'
import { Item } from './Item'

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
    width: '66%',
  }),
}

export const CombineImages = () => {
  const [processedImages, setProcessedImages] = useState([])
  const [generalValues, setGeneralValues] = useState(DEFAULT_VALUES)
  const [textsListDummy, setTextsListDummy] = useState([])
  const [itemsListDummy, setItemsListDummy] = useState([])

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
    const values = structuredClone(generalValues)
    const property = event.target.name

    if (type === 'IMAGE') {
      values['image'][property] = event.target.value
    }

    if (type === 'BACKGROUND') {
      values['background'][property] = event.target.value
    }

    setGeneralValues(values)
  }

  const updateEffectValues = (selectedValues, type) => {
    const values = structuredClone(generalValues)
    const newValues = selectedValues.map((value) => {
      return value.value
    })

    values[type]['effect'] = newValues
    setGeneralValues(values)
  }

  const addNewText = () => {
    const values = [...textsListDummy]

    values.push(generateId())

    setTextsListDummy(values)
  }

  const addNewItem = () => {
    const values = [...itemsListDummy]

    values.push(generateId())

    setItemsListDummy(values)
  }

  const setTextValues = (textValues) => {
    const values = structuredClone(generalValues)
    const addedText = values.texts.filter((text) => text.id !== textValues.id)

    addedText.push(textValues)
    values.texts = addedText

    toast.success('Text added succesfully')
    setGeneralValues(values)
  }

  const setItemValues = (itemValues) => {
    const values = structuredClone(generalValues)
    const addedItem = values.items.filter((text) => text.id !== itemValues.id)

    addedItem.push(itemValues)
    values.items = addedItem

    toast.success('Item added succesfully')
    setGeneralValues(values)
  }

  const generateId = () => {
    return Math.floor(Math.random() * 1000)
  }

  return (
    <>
      <Dropzone uploadImages={uploadImages} selectImage={selectImage} />
      {processedImages.length > 0 ? (
        <ImagePreview
          processedImages={processedImages}
          generalValues={generalValues}
        />
      ) : null}
      <section className="mt-10">
        <h1 className="text-3xl">Custom not selected image</h1>
        <div className="grid grid-cols-1 gap-6 mt-5">
          <div className="grid grid-cols-1 gap-2">
            <label className="text-xl">Position</label>
            <div className="flex gap-5">
              <div className="flex gap-1">
                <span htmlFor="xPosition" className="text-xl mt-1">
                  X
                </span>
                <input
                  name="xPosition"
                  id="xPosition"
                  className="w-full text-sm bg-white text-black focus:outline-none p-2 rounded-md"
                  onChange={(e) => updateValues(e, 'IMAGE')}
                  placeholder="X position"
                  type="number"
                />
              </div>
              <div className="flex flex-row gap-1">
                <span htmlFor="yPosition" className="text-xl mt-1">
                  Y
                </span>
                <input
                  name="yPosition"
                  id="yPosition"
                  className="w-full text-sm bg-white text-black focus:outline-none p-2 rounded-md"
                  onChange={(e) => updateValues(e, 'IMAGE')}
                  placeholder="Y position"
                  type="number"
                />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <label className="text-xl">Size</label>
            <div className="flex flex-row gap-1">
              <input
                name="size"
                id="size"
                className="w-2/3 text-sm bg-white text-black focus:outline-none p-2 rounded-md"
                onChange={(e) => updateValues(e, 'IMAGE')}
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="gap-1 mt-5">
          <div className="flex flex-col gap-1">
            <p className="text-xl">Effect</p>
            <Select
              isMulti
              closeMenuOnSelect={false}
              name="effect"
              options={effects}
              placeholder="Select options"
              maxHeight={10}
              styles={customStyles}
              className="p-1 bg-white rounded-md shadow-sm focus:outline-none"
              onChange={(values) => updateEffectValues(values, 'image')}
            />
          </div>
        </div>
      </section>
      <section className="mt-10">
        <h1 className="text-3xl">Add effect to background</h1>
        <div className="flex flex-col gap-1 mt-5">
          <label className="text-xl">Effect</label>
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
      <div className="flex flex-col grid grid-cols-1 mt-10 gap-10 sm:grid-cols-2 sm:flex-row">
        <div>
          <div className="flex flex-row gap-5">
            <p className="text-3xl">Texts</p>
            <button
              onClick={() => {
                addNewText()
              }}
              className="bg-blue-600 text-white p-2 rounded-md"
            >
              New Text <span>➕</span>
            </button>
          </div>
          {textsListDummy.map((text) => (
            <Text key={text} setTextValues={setTextValues} />
          ))}
        </div>
        <div className="mt-10 sm:mt-0">
          <div className="flex flex-row gap-5">
            <p className="text-3xl">Items</p>
            <button
              onClick={() => {
                addNewItem()
              }}
              className="bg-blue-600 text-white p-2 rounded-md"
            >
              New Item <span>➕</span>
            </button>
          </div>
          {itemsListDummy.map((item) => (
            <Item key={item} setItemValues={setItemValues} />
          ))}
        </div>
      </div>
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
