import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useCartContext } from "../../context/CartContext/CartContext.jsx"
import { CartMenu } from "../index.js"

const NavbarLink = ({children,...props}) => {
  return (
    <NavLink {...props}
      className={({isActive}) => `h-full px-2 flex items-center font-medium ${isActive && "text-yellow-500"}`}
      >
      {children}
    </NavLink>
  )
}

export const Navbar = () => {
  const [cartMenu, setCartMenu] = useState(false)
  const {cartQty} = useCartContext()

  return (
    <>
      <header className="sticky top-0 left-0 z-20 w-full h-16 bg-white border-b-2 border-gray-500">
        <nav className="w-full max-w-screen-2xl h-full mx-auto px-2 py-2 flex items-center gap-2">
          <div className="h-full px-2 flex items-center">
            <h1 className="text-2xl font-semibold">
              <span className="text-blue-500">FRI</span>
              <span className="text-yellow-500">Market</span>
            </h1>
          </div>
          <ul className="h-full px-2 flex justify-end gap-2 grow">
            <li className="">
              <NavbarLink to='/'>Inicio</NavbarLink>
            </li>
            <li className="">
              <NavbarLink to='/shop/all'>Tienda</NavbarLink>
            </li>
          </ul>
          <div className="h-full px-2 flex gap-2">
            <button className="h-10 px-2 flex items-center justify-center gap-2 bg-blue-500 text-white rounded-md"
            onClick={() => setCartMenu(!cartMenu)}>
              <span className="text-sm">{cartQty}</span>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-md">
              <i className="fa-solid fa-user"></i>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-md">
              <i className="fa-solid fa-user"></i>
            </button>
          </div>
        </nav>
      </header>
      {cartMenu && <CartMenu handle={setCartMenu} />}
    </>
  )
}
