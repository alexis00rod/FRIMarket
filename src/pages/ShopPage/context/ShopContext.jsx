import { useState, useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom'

const ShopContext = createContext()
export const useShopContext = () => useContext(ShopContext)

export const ShopContextProvider = ({children}) => {
  const [filters, setFilters] = useState({})
  const navigate = useNavigate()

  const cleanFilters = () => {
    setFilters({})
    navigate('/shop')
  }

  return (
    <ShopContext.Provider 
    value={{filters,setFilters,cleanFilters}}>
      {children}
    </ShopContext.Provider>
  )
}
