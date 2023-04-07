import { useScrollActive } from "../../hooks/useScrollActive.jsx"
import { CartMenu, Logo, NavbarMenu, UserMenu, InputSearch } from "../index.js"

export const Navbar = () => {
  const {scrollActive} = useScrollActive()

  return (
    <header className={`navbar ${scrollActive && 'navbar-contract'}`}>
      <div className="navbar-top">
        <div className="navbar-container">
          <div className="relative w-full h-full flex items-center gap-4">
            <div className="hidden md:flex">
              <Logo color='blue' />
            </div>
            <div className="grow flex justify-end">
              <InputSearch />
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-bottom">
        <div className="navbar-container">
          <NavbarMenu />
          <div className="flex grow md:hidden">
            <Logo color='white' />
          </div>    
          <div className="h-full flex gap-4">
            <CartMenu />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}