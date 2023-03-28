import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "../Button/Button"

const NavbarLink = ({children,...props}) => {
  return (
    <NavLink {...props}
      className={({isActive}) => `menu-link ${isActive && "menu-link-active"}`}
      >
      {children}
    </NavLink>
  )
}

export const NavbarMenu = () => {
  const [menu, setMenu] = useState(false)

  return (
    <div className="relative">
      <Button color='btn-blue' style='btn-menu' onClick={() => setMenu(!menu)} />
      {menu &&
      <ul className="menu menu-left">
        <li className="menu-item">
          <NavbarLink to='/'>Inicio</NavbarLink>
        </li>
        <li className="menu-item">
          <NavbarLink to='/shop/all'>Tienda</NavbarLink>
        </li>
        <li className="menu-item">
          <NavbarLink to='/sellers'>Vendedores</NavbarLink>
        </li>
      </ul>}
    </div>
  )
}
