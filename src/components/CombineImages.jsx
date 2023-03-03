import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL } from '../consts'
import { UploadedImages } from './UploadedImages'
import { Dropzone } from './Dropzone'
import { useImages } from '../hooks/useImages'

export const CombineImages = () => {
  // const uploadImages = async () => {
  //   const request = new XMLHttpRequest()
  //   const formData = new FormData()
  //   request.open('POST', API_URL, true)
  //   request.onreadystatechange = () => {
  //     if (request.readyState === 4 && request.status === 200) {
  //       console.log(JSON.parse(request.response))
  //     }
  //   }
  //   formData.append('upload_preset', 'hackathon')
  //   formData.append('timestamp', Date.now() / 1000)
  //   formData.append('api_key', 976248287242189)
  //   for (let index = 0; index < images.length; index++) {
  //     const element = images[index]
  //     formData.append('file', element)
  //   }
  //   request.send(formData)
  // }

  return (
    <>
      <section>
        <Dropzone />
        <UploadedImages />
        {/* {images.length === 2 ? (
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
        ) : null} */}
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
