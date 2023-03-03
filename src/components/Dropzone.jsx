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

export const Dropzone = () => {
  const { images, setNewImages } = useImages()
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop: (acceptedFiles) => {
      console.log('dropzone', images)
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

      setNewImages([...images, ...newFiles])
    },
  })

  const style = useMemo(
    () => ({
      ...dropZoneStyle,
    }),
    []
  )

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop two files here, or click to select files</p>
    </div>
  )
}
