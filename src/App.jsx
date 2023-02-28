import { useMemo, useState } from 'react'
import cloudinaryLogo from './assets/cloudinaryLogo.svg'
import { useDropzone } from 'react-dropzone'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const baseStyle = {
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

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
}

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
}

function App() {
  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop: (acceptedFiles) => {
      if (
        files.length >= 2 ||
        acceptedFiles.length > 2 ||
        acceptedFiles.length === 0
      ) {
        console.log('hi')
        toast.error('You can only upload 2 images')

        return
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )

      setFiles([...files, ...newFiles])
    },
  })

  const style = useMemo(
    () => ({
      ...baseStyle,
    }),
    []
  )

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
        />
      </div>
    </div>
  ))

  return (
    <div className="max-w-xl m-auto grid place-content-center w-full">
      <header className="flex justify-center py-10">
        <h1 className="text-3xl font-bold">
          Image <span className="text-green-600 underline">Combiner</span>
        </h1>
      </header>

      <main className="w-full block">
        <section>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop two files here, or click to select files</p>
          </div>
          <aside style={thumbsContainer}>{thumbs}</aside>
        </section>
      </main>

      <footer className="flex justify-center item-center gap-x-2 font-semibold pt-10">
        Made with{' '}
        <a href="https://cloudinary.com/" target="_blank" rel="noreferrer">
          <img className="w-36" src={cloudinaryLogo} alt="Cloudinary Logo" />
        </a>
      </footer>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        newestOnTop={true}
        closeOnClick={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </div>
  )
}

export default App
