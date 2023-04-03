import { Link } from "react-router-dom"
import { useCategories } from "../../hooks/useCategories.jsx"
import { Accordion, Logo } from "../index.js"

export const Footer = () => {
  const {categories} = useCategories()

  return (
    <footer className="w-full flex flex-col bg-gray-200">
      <div 
      className="w-full max-w-screen-2xl px-2 py-4 mx-auto flex flex-col lg:flex-row items-center lg:items-start">
      <div className="w-full max-w-md px-2 py-2 flex flex-col items-center lg:items-start">
        <Logo />
        <div className="mt-1 flex flex-col">
          <p className="px-2 py-2 text-sm text-gray-600 text-center lg:text-left">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, consequuntur. Nihil, dolores?</p>
          <div className="px-2 py-2 flex justify-center lg:justify-start gap-4 text-gray-600 text-4xl">
            <i className="fa-solid fa-circle-check"></i>
            <i className="fa-solid fa-shield"></i>
            <i className="fa-solid fa-truck-fast"></i>
          </div>
        </div>
      </div>
        <div className="w-full px-2 flex flex-col max-w-md sm:hidden">
          <Accordion title='Categorias'>
            {categories && categories.map(e => (
              <Link 
              key={e.id}
              to={`/shop/${e.idCategory}`} 
              className='w-max flex items-center text-sm hover:text-yellow-500'>
                {e.name}
              </Link>
            ))}
          </Accordion>
          <Accordion title='Informacion'>
            <div className="flex items-center gap-2 text-gray-600">
              <i className="w-8 h-8 flex items-center justify-center text-xl fa-solid fa-location-dot"></i>
              <p className="text-sm">Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <i className="w-8 h-8 flex items-center justify-center text-xl fa-solid fa-envelope"></i>
              <p className="text-sm">Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="flex items-center gap-2 text-red-500">
              <i className="w-8 h-8 flex items-center justify-center text-xl fa-solid fa-phone"></i>
              <p className="text-lg">Lorem ipsum dolor sit amet.</p>
            </div>
          </Accordion>
        </div>
        <div className="hidden sm:flex flex-wrap grow">
          <ul className="px-2 py-2 grow grid grid-cols-3 auto-rows-max gap-2">
            <li className="w-full h-8 px-1 flex items-center">
              <span className="w-full flex items-center font-medium">Categorias</span>
            </li>
            {categories && categories.map(e => (
              <li key={e.id} className="px-1 w-full h-8 flex items-center">
                <Link to={`/shop/${e.idCategory}`} className='w-max flex items-center text-sm hover:text-yellow-500'>
                  {e.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="xl:max-w-xs px-2 py-2 flex flex-col gap-2 grow">
            <h4 className="w-full h-8 px-1 flex items-center font-medium">Informacion</h4>
            <div className="flex xl:flex-col gap-4 xl:gap-2">
              <p className="flex items-center text-gray-600">
                <i className="w-8 h-8 flex items-center justify-center text-xl fa-solid fa-location-dot"></i>
                <span className="text-sm">Av. Siempre viva 1234</span>
              </p>
              <p className="flex items-center text-gray-600">
                <i className="w-8 h-8 flex items-center justify-center text-xl fa-solid fa-envelope"></i>
                <span className="text-sm">email@email.com</span>
              </p>
              <p className="flex items-center text-red-500">
                <i className="w-8 h-8 flex items-center justify-center text-xl fa-solid fa-phone"></i>
                <span className="text-lg font-medium">+080012456</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-2 py-1 bg-gray-300">
        <div className="w-full max-w-screen-2xl px-2 py-1 mx-auto flex justify-center">
          <span className="text-sm">Copyright © 2023</span>
        </div>
      </div>
    </footer>
  )
}
