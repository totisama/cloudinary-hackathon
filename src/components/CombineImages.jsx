import { useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL } from '../consts'

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

export const CombineImages = () => {
  const [images, setImages] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles)
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

  const uploadImages = async () => {
    const request = new XMLHttpRequest()
    const formData = new FormData()

    request.open('POST', API_URL, true)
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        console.log(JSON.parse(request.response))
      }
    }

    formData.append('upload_preset', 'hackathon')
    formData.append('timestamp', Date.now() / 1000)
    formData.append('api_key', 976248287242189)

    for (let index = 0; index < images.length; index++) {
      const element = images[index]

      formData.append('file', element)
    }

    // console.log(formData.getAll('file'));

    request.send(formData)
  }

  return (
    <>
      <section>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop two files here, or click to select files</p>
        </div>
        <aside style={previewContainer}>
          {previewImages}
          {images.length === 2 ? (
            <div className="w-full flex gap-5 justify-center mt-4">
              <p className="text-2xl">Select an image as background </p>
              <button
                className="bg-blue-600 text-white p-1 rounded-md"
                onClick={() => {
                  uploadImages()
                }}
              >
                Upload
              </button>
            </div>
          ) : null}
        </aside>
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
