import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL } from '../consts'
import { UploadedImages } from './UploadedImages'
import { Dropzone } from './Dropzone'

export const CombineImages = () => {
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

  const updateImage = (imageId, imageName) => {
    const image = images.filter((image) => image.name === imageName)
    console.log(image)
  }

  const uploadImages = async () => {
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData()
      const image = images[i]

      formData.append('file', image)
      formData.append('upload_preset', 'hackathon')
      formData.append('timestamp', Date.now() / 1000)
      // this is not the secrete api key
      formData.append('api_key', 976248287242189)

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      const { format, original_filename, public_id: imageId } = data
      const imageName = original_filename + '.' + format

      updateImage(imageId, imageName)
    }
  }

  return (
    <>
      <Dropzone />
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
