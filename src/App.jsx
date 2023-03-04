import { CombineImages } from './components/CombineImages'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="max-w-xl m-auto grid grid-cols-1 w-full mb-16">
      <header className="flex justify-center py-10">
        <h1 className="text-3xl font-bold">
          Image <span className="text-green-600 underline">Combiner</span>
        </h1>
      </header>

      <main className="w-full block">
        <CombineImages />
      </main>
      <Footer />
    </div>
  )
}

export default App
