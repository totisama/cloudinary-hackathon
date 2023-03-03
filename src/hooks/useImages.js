import { useState } from 'react'

export function useImages() {
  const [images, setImages] = useState([])

  const setNewImages = (newImages) => {
    setImages(newImages)
  }

  const removeImage = (name) => {
    const newArray = images.filter((image) => image.name !== name)
    setImages(newArray)
  }

  return { images, setNewImages, removeImage }
}
