import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useCartContext } from "../../context/CartContext/CartContext.jsx"
import { CartMenu } from "../index.js"

const NavbarLink = ({children,...props}) => {
  return (
    <NavLink {...props}
      className={({isActive}) => `h-full px-2 flex items-center font-medium ${isActive && "text-white font-bold"}`}
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
      <header className="w-full">
        <div className="w-full h-12 px-1 bg-white">
          <div className="w-full max-w-screen-2xl h-full px-1 mx-auto flex items-center">
            <h1 className="w-max h-full px-2 flex items-center text-3xl text-blue-500 font-black"><span className="text-yellow-500">FRI</span>Market</h1>
            <div className="h-full px-2 flex items-center justify-end grow">
              <form className="w-full max-w-3xl h-8 flex items-center border border-gray-300 rounded-md">
                <input type="text" name="" id="" className="h-full px-2 grow outline-none" />
                <button type="submit" className="w-8 h-full flex items-center justify-center bg-gray-100 border-l border-gray-300">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </div>
            <div className="h-full px-2 flex items-center gap-2">
              <button className="h-8 px-2 flex items-center justify-center gap-2 bg-blue-500 text-white rounded-md"
              onClick={() => setCartMenu(!cartMenu)}>
                <span className="text-sm font-semibold">{cartQty}</span>
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
              <button className="h-8 px-2 flex items-center gap-2 bg-blue-500 text-white rounded-md">
                <i className="fa-solid fa-user"></i>
              </button>
            </div>
          </div>
        </div>
        <nav className="w-full h-12 px-1 bg-blue-500 text-white">
          <div className="w-full max-w-screen-2xl h-full px-1 mx-auto flex items-center gap-2">
            <button className="h-8 px-2 flex items-center gap-2">
              <i className="fa-solid fa-bars"></i>
              <span className="text-sm font-medium">Categorias</span>
            </button>
            <ul className="h-full px-2 flex  gap-2 grow">
              <li className="">
                <NavbarLink to='/'>Inicio</NavbarLink>
              </li>
              <li className="">
                <NavbarLink to='/shop/all'>Comprar</NavbarLink>
              </li>
              <li className="">
                <NavbarLink to='/post'>Vender</NavbarLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {cartMenu && <CartMenu handle={setCartMenu} />}
    </>
  )

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
              <span className="text-sm font-semibold">{cartQty}</span>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-md">
              <i className="fa-solid fa-user"></i>
            </button>
          </div>
        </nav>
      </header>
      
    </>
  )
}
