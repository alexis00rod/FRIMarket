import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useCartContext } from "../../context/CartContext/CartContext.jsx"
import { CartMenu, CategoriesMenu, Logo, Searchbox, UserMenu } from "../index.js"

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
  const [categoriesMenu, setCategoriesMenu] = useState(false)
  const {cartQty} = useCartContext()

  return (
    <>
      <header className="sticky top-0 left-0 z-30 w-full">
        <div className="w-full h-12 px-1 bg-white">
          <div className="w-full max-w-screen-2xl h-full px-1 mx-auto flex items-center">
            <Logo />
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
        <div className="w-full h-12 px-1 bg-blue-500 text-white">
          <nav className="w-full max-w-screen-2xl h-full mx-auto px-2 flex items-center gap-2">
            <button 
            className="h-full px-2 flex items-center gap-2 font-medium text-white"
            onClick={() => setCategoriesMenu(!categoriesMenu)}
            >
              <i className="fa-solid fa-bars"></i>
              Categorias
            </button>
            <NavbarLink to='/'>Inicio</NavbarLink>
            <NavbarLink to='/shop/all'>Tienda</NavbarLink>
            <NavbarLink to='/sellers'>Vendedores</NavbarLink>
          </nav>
        </div>
      </header>
      {categoriesMenu && <CategoriesMenu handle={setCategoriesMenu} />}
      {cartMenu && <CartMenu handle={setCartMenu} />}
      {userMenu && <UserMenu handle={setUserMenu} />}
    </>
  )
}
