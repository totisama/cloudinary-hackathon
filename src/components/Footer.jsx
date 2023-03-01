import cloudinaryLogo from '../assets/cloudinaryLogo.svg'

export const Footer = () => {
  return (
    <footer className="flex justify-center item-center gap-x-2 font-semibold pt-10">
      Made with{' '}
      <a href="https://cloudinary.com/" target="_blank" rel="noreferrer">
        <img className="w-36" src={cloudinaryLogo} alt="Cloudinary Logo" />
      </a>
    </footer>
  )
}
