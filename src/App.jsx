import cloudinaryLogo from './assets/cloudinaryLogo.svg'
import './App.css'

function App() {
  return (
    <div className="max-w-xl m-auto grid place-content-center w-full h-screen">
      <header className="flex justify-center py-10">
        <h1 className="text-3xl font-bold">Image <span className='text-green-600 underline'>Combiner</span></h1>
      </header>

      <main className="w-full block">Contenido</main>

      <footer className="flex justify-center item-center gap-x-2 font-semibold pt-10">
        Made with{' '}
        <a href="https://cloudinary.com/" target="_blank" rel="noreferrer">
          <img className="w-36" src={cloudinaryLogo} alt="Cloudinary Logo" />
        </a>
      </footer>
    </div>
  )
}

export default App
