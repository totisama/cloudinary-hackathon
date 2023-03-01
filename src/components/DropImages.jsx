import { useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

export const DropImages = () => {
  const [images, setImages] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    accept: {
      'image/jpeg': [],
      'image/png': [],
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

      const acceptedFilesArray = acceptedFiles.map((file) => file.name)

      if (images.find((file) => acceptedFilesArray.includes(file.name))) {
        toast.error('Cant upload images with the same name')

        return
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )

      setImages([...images, ...newFiles])
    },
  })

  const style = useMemo(
    () => ({
      ...dropZoneStyle,
    }),
    []
  )

  const removeImage = (name) => {
    const newArray = images.filter((file) => file.name !== name)
    setImages(newArray)
  }

  const handleCheck = (e) => {
    console.log(e.target.value)
  }

  const previewImages = images.map((file) => (
    <div style={previewInner} key={file.name}>
      <img
        src={file.preview}
        style={img}
        onLoad={() => {
          URL.revokeObjectURL(file.preview)
        }}
      />
      <div className="flex flex-row w-full justify-center gap-8">
        <input
          className="w-4"
          type="radio"
          name="radio"
          value={file.name}
          onChange={handleCheck}
        />
        <button
          className="bg-red-600 text-white p-1 rounded-md"
          onClick={() => {
            removeImage(file.name)
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ))

  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop two files here, or click to select files</p>
      </div>
      <aside style={previewContainer}>
        {previewImages}
        {images.length > 0 ? (
          <div className="w-full flex justify-center">
            <p className="text-xl">Select an image as background </p>
          </div>
        ) : null}
      </aside>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        newestOnTop={true}
        closeOnClick={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </section>
  )
}
