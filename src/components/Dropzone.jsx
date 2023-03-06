import { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { useImages } from '../hooks/useImages.js'
import { toast } from 'react-toastify'

const dropZoneStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#000000',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const previewContainer = {
  with: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 15,
  marginTop: 20,
}

const previewInner = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  gap: 10,
}

const img = {
  display: 'block',
  width: 'auto',
  maxWidth: '250px',
  // maxHeigth: '100px',
}

export const Dropzone = ({ uploadImages, selectImage }) => {
  const { images, setNewImages, removeImage } = useImages()
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
    onDrop: (acceptedFiles) => {
      if (
        images.length >= 2 ||
        acceptedFiles.length > 2 ||
        acceptedFiles.length === 0 ||
        (images.length === 1 && acceptedFiles.length === 2)
      ) {
        toast.error('You can only upload 2 images')

        return
      }

      const acceptedFilesNames = acceptedFiles.map((file) => file.name)

      if (images.find((file) => acceptedFilesNames.includes(file.name))) {
        toast.error('Cant upload images with the same name')

        return
      }

      let newImages = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )

      setNewImages([...images, ...newImages])
      // We just want to upload the new images
      uploadImages(newImages)
    },
  })

  const style = useMemo(
    () => ({
      ...dropZoneStyle,
    }),
    []
  )

  const handleCheck = (e) => {
    const imageName = e.target.value
    selectImage(imageName.substring(0, imageName.indexOf('.')))
  }

  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop two files here, or click to select files</p>
      </div>
      <aside style={previewContainer}>
        {images.map((image) => (
          <div style={previewInner} key={image.name}>
            <img
              src={image.preview}
              style={img}
              onLoad={() => {
                URL.revokeObjectURL(image.preview)
              }}
            />
            <div className="flex flex-row w-full justify-center gap-8">
              <input
                className="w-4"
                type="radio"
                name="radio"
                value={image.name}
                onChange={handleCheck}
              />
              <button
                className="bg-red-600 text-white p-1 rounded-md"
                onClick={() => {
                  removeImage(image.name)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </aside>
      {images.length === 2 ? (
        <aside className="w-full flex gap-5 justify-center mt-4">
          <p className="text-2xl">Select an image as background </p>
        </aside>
      ) : null}
    </section>
  )
}
