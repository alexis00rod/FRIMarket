import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useCartContext } from "../../context/CartContext/CartContext.jsx"
import { CartMenu, Searchbox, UserMenu } from "../index.js"

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
  const [userMenu, setUserMenu] = useState(false)
  const {cartQty} = useCartContext()

  return (
    <>
      <header className="sticky top-0 left-0 w-full">
        <div className="w-full h-12 px-1 bg-white">
          <div className="w-full max-w-screen-2xl h-full px-1 mx-auto flex items-center">
            <Link to='/' className="w-max px-2">
              <h1 className="flex items-center text-3xl text-blue-500 font-black"><span className="text-yellow-500">FRI</span>Market</h1>
            </Link>
            <div className="h-full px-2 flex items-center justify-end grow">
              {/* Search */}
              <Searchbox />
            </div>
            <div className="h-full px-2 flex items-center gap-2">
              <button 
              className="h-8 px-2 flex items-center justify-center gap-2 bg-blue-500 text-white rounded-md"
              onClick={() => setCartMenu(!cartMenu)}
              >
                <span className="text-sm font-semibold">{cartQty}</span>
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
              <button 
              className="h-8 px-2 flex items-center gap-2 bg-blue-500 text-white rounded-md"
              onClick={() => setUserMenu(!userMenu)}
              >
                <i className="fa-solid fa-user"></i>
              </button>
            </div>
          </div>
        </div>
        <nav className="w-full h-12 px-1 bg-blue-500 text-white">
          <ul className="w-full max-w-screen-2xl h-full mx-auto px-2 flex gap-2 grow">
            <li className="">
              <NavbarLink to='/'>Inicio</NavbarLink>
            </li>
            <li className="">
              <NavbarLink to='/shop/all'>Tienda</NavbarLink>
            </li>
          </ul>
        </nav>
      </header>
      {cartMenu && <CartMenu handle={setCartMenu} />}
      {userMenu && <UserMenu handle={setUserMenu} />}
    </>
  )
}
