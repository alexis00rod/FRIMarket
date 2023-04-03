import { NavLink } from "react-router-dom"
import { useScrollActive } from "../../hooks/useScrollActive.jsx"
import { CartMenu, Logo, NavbarMenu, UserMenu, InputSearch } from "../index.js"

const NavbarLink = ({children,...props}) => {
  return (
    <NavLink {...props}
      className={({isActive}) => `btn btn-blue btn-m ${isActive && "btn-blue-active"}`}
      >
      <span className="font-medium">{children}</span>
    </NavLink>
  )
}

export const Navbar = () => {
  const {scrollActive} = useScrollActive()

  // console.log(scrollActive)

  return (
    <header className='navbar'>
      <div className='navbar-top'>
      {/* <div className={`navbar-top ${!scrollActive && 'h-full opacity-100'}`}> */}
        <div className="navbar-container">
          <Logo />
          <div className="h-full flex justify-end grow">
            <InputSearch />
          </div>
          <div className="hidden md:flex gap-2">
            <CartMenu />
            <UserMenu />
          </div>
        </div>
      </div>
      <div className='navbar-bot'>
        <nav className="navbar-container">
          <div className="hidden w-full md:flex gap-2">
            <NavbarLink to='/'>Inicio</NavbarLink>
            <NavbarLink to='/shop/all'>Tienda</NavbarLink>
            <NavbarLink to='/sellers'>Vendedores</NavbarLink>
          </div>
          <div className="w-full flex gap-2 md:hidden">
            <NavbarMenu />
            <div className="flex justify-end grow gap-2">
              <CartMenu />
              <UserMenu />
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}