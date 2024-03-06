import { createContext, useContext, useState } from 'react';

const NavbarContext = createContext()

export const useNavbarContext = () => useContext(NavbarContext)

export const NavbarProvider = ({children}) => {
  const [menu, setMenu] = useState()

  const handleMenu = () => {
    setMenu(!menu)
    document.body.style.overflow = menu ? 'auto' : 'hidden'
  }

  const closeMenu = () => {
    if(menu) {
      setMenu(false)
      document.body.style.overflow = menu ? 'auto' : 'hidden'
    }
  }
  
  return (
    <NavbarContext.Provider value={{menu, setMenu, handleMenu, closeMenu}}>
      {children}
    </NavbarContext.Provider>
  )
}
