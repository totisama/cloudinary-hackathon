import { useImages } from '../hooks/useImages.js'

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

export const UploadedImages = () => {
  const { images, removeImage } = useImages()

  const handleCheck = (e) => {
    console.log(e.target.value)
  }

  return (
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
  )
}
