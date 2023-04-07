import { useState } from "react"
import { Button, ButtonLink, Menu } from "../index.js"

export const NavbarMenu = () => {
  const [menu, setMenu] = useState(false)

  return (
    <div className="h-full flex items-center">
      <div className="h-full relative flex md:hidden items-center">
        <Button color='btn-blue' size='btn-s' style={`btn-menu ${menu && 'btn-menu-active'}`} onClick={() => setMenu(!menu)}>
          <span></span><span></span><span></span>
        </Button>
        <Menu expand={menu} onClick={() => setMenu(false)} position='left'>
          <ButtonLink to='/' size='btn-m' color='btn-black' active='btn-text-yellow'>Inicio</ButtonLink>
          <ButtonLink to='/shop/all' size='btn-m' color='btn-black' active='btn-text-yellow'>Tienda</ButtonLink>
          <ButtonLink to='/sellers' size='btn-m' color='btn-black' active='btn-text-yellow'>Vendedores</ButtonLink>
        </Menu>
      </div>
      <div className="hidden w-full md:flex gap-4">
        <ButtonLink to='/' size='btn-m' color='btn-blue' active='btn-blue-active'>Inicio</ButtonLink>
        <ButtonLink to='/shop/all' size='btn-m' color='btn-blue' active='btn-blue-active'>Tienda</ButtonLink>
        <ButtonLink to='/sellers' size='btn-m' color='btn-blue' active='btn-blue-active'>Vendedores</ButtonLink>
      </div>
    </div>
  )
}
