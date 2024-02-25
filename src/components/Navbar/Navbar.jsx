import { useScrollActive } from "../../hooks/useScrollActive.jsx"
import { Logo, NavbarCart, NavbarMenu, NavbarSearch } from "../index.js"

export const Navbar = () => {
  const {scrollActive} = useScrollActive()

  return (
    <header className={`navbar ${scrollActive && 'navbar-scroll'}`}>
      <div className="navbar-top">
        <div className="navbar-container">
          <div className="px-2 hidden lg:flex">
            <Logo color='blue' />
          </div>
          <NavbarSearch />
        </div>
      </div>
      <div className="navbar-bottom">
        <div className="navbar-container">
          <NavbarMenu />
          <div className="flex grow lg:hidden">
            <Logo />
          </div>
          <NavbarCart />
        </div>      
      </div>
    </header>
  )
}