import { NavLink } from "react-router-dom"

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
  return (
    <header className="sticky top-0 left-0 z-20 w-full bg-white border-b-2 border-gray-500">
      <nav className="w-full max-w-screen-2xl mx-auto px-2 py-2 flex items-center gap-2">
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
        <ul className="h-full px-2 flex gap-2">
          <li className="">
            <button className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-md"><i className="fa-solid fa-cart-shopping"></i></button>
          </li>
          <li className="">
            <button className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-md"><i className="fa-solid fa-user"></i></button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
