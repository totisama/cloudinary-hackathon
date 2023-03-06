import { useId, useState } from 'react'

export const Text = ({ setTextValues }) => {
  const textId = useId()
  const [added, setAdded] = useState(false)
  const [opacity, setOpacity] = useState(100)
  const [rotation, setRotation] = useState(0)
  const handleSubmit = (event) => {
    event.preventDefault()

    const currentValues = Object.fromEntries(new FormData(event.target))
    currentValues.id = textId

    setAdded(true)
    setTextValues(currentValues)
  }

  return (
    <section className="mt-5 px-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="text" className="text-xl">
            Text
          </label>
          <input
            required
            name="text"
            id="text"
            className="w-full text-sm bg-white text-black focus:outline-none p-2 rounded-md mt-1"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="position" className="text-xl">
            Position
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-row gap-1">
              <span htmlFor="xPosition" className="text-xl mt-2">
                X
              </span>
              <input
                required
                name="xPosition"
                id="position"
                className="w-full text-sm bg-white text-black focus:outline-none p-2 rounded-md mt-1"
                placeholder="X position"
                type="number"
              />
            </div>
            <div className="flex flex-row gap-1">
              <span htmlFor="yPosition" className="text-xl mt-2">
                Y
              </span>
              <input
                required
                name="yPosition"
                id="position"
                className="w-full text-sm bg-white text-black focus:outline-none p-2 rounded-md mt-1"
                placeholder="Y position"
                type="number"
              />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="size" className="text-xl">
            Size
          </label>
          <input
            required
            name="size"
            id="size"
            className="w-full text-sm bg-white text-black focus:outline-none p-2 rounded-md mt-1"
            placeholder="Number between 1 and 100"
            type="number"
            min="1"
            max="100"
          />
        </div>
        <div>
          <label htmlFor="color" className="text-xl">
            Color
          </label>
          <input
            name="color"
            id="color"
            className="w-full bg-white rounded-md mt-1"
            type="color"
          />
        </div>
        <div>
          <label htmlFor="opacity" className="text-xl">
            Opacity
          </label>
          <div className="flex flex-row gap-4">
            <input
              name="opacity"
              id="opacity"
              className="w-full bg-white rounded-md mt-1"
              type="range"
              defaultValue="100"
              min="0"
              max="100"
              onChange={(e) => {
                setOpacity(e.target.value)
              }}
            />
            <span>{opacity}</span>
          </div>
        </div>
        <div>
          <label htmlFor="rotation" className="text-xl">
            Rotation
          </label>
          <div className="flex flex-row gap-4">
            <input
              name="rotation"
              id="rotation"
              className="w-full bg-white rounded-md mt-1"
              type="range"
              defaultValue="0"
              min="0"
              max="360"
              onChange={(e) => {
                setRotation(e.target.value)
              }}
            />
            <span>{rotation}°</span>
          </div>
        </div>
        <div className="flex justify-center col-span-2">
          <button
            type="submit"
            className="w-1/2 bg-green-600 text-md text-center font-bold text-white rounded-md px-4 py-2"
          >
            {added ? 'Edit Text' : 'Add Text'}
          </button>
        </div>
      </form>
    </section>
  )
}
