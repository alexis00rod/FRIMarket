import { NavLink } from "react-router-dom"
import { CartMenu, Logo, NavbarMenu, Searchbox, UserMenu } from "../index.js"

const NavbarLink = ({children,...props}) => {
  return (
    <NavLink {...props}
      className={({isActive}) => `btn btn-blue btn-link ${isActive && "btn-link-active"}`}
      >
      {children}
    </NavLink>
  )
}

export const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="w-full max-w-screen-2xl h-full px-2 py-2 mx-auto flex flex-wrap items-center md:gap-2">
          <Logo />
          <Searchbox />
          <div className="hidden md:flex gap-2">
            <CartMenu />
            <UserMenu />
          </div>
        </div>
      </div>
      <div className="navbar-bot">
        <nav className="w-full max-w-screen-2xl h-full mx-auto px-2 py-2 flex items-center">
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