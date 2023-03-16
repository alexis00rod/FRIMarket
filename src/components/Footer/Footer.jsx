import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCategories } from "../../services/firestore.js"
import { Logo } from "../index.js"

export const Footer = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories(setCategories)
  },[])

  return (
    <footer className="w-full flex flex-col bg-gray-200">
      <div className="w-full max-w-screen-2xl px-2 py-4 mx-auto flex">
        <div className="px-1 py-2 w-full max-w-xs">
          <Logo />
          <p className="px-2 py-2 text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, consequuntur. Nihil, dolores?</p>
          <div className="px-2 py-2 flex gap-4 text-gray-600 text-4xl">
            <i className="fa-solid fa-circle-check"></i>
            <i className="fa-solid fa-shield"></i>
            <i className="fa-solid fa-truck-fast"></i>
          </div>
        </div>
        <ul className="px-1 py-2 grow grid grid-cols-3 auto-rows-max">
          <li className="w-full h-7 flex items-center">
            <span className="w-full px-2 flex items-center font-medium">Categorias</span>
          </li>
          {categories && categories.map(e => (
            <li className="px-2 w-full h-7 flex items-center">
              <Link to={`/shop/${e.idCategory}`} className='w-max flex items-center text-sm hover:text-yellow-500'>
                {e.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="w-full max-w-xs px-1 py-2 flex flex-col gap-2">
          <h4 className="px-2 font-medium">Informacion</h4>
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
        </div>
      </div>
      <div className="w-full px-2 py-1 bg-gray-300">
        <div className="w-full max-w-screen-2xl px-2 py-1 mx-auto">
          <span className="text-sm">Copyright © 2023</span>
        </div>
      </div>
    </footer>
  )
}
