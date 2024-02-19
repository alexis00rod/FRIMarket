import { useState, useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom'

const ShopContext = createContext()
export const useShopContext = () => useContext(ShopContext)

export const ShopContextProvider = ({children}) => {
  const [filters, setFilters] = useState({})
  const navigate = useNavigate()

  const handlePrice = ({target: {name,value}}) => {
    // const price = name === 'minPrice'
    //   ? value === '' ? 0 : parseFloat(value)
    //   : value === '' ? 9999999999 : parseFloat(value)

    // setFilters({
    //   ...filters,
    //   [name]: price
    // })
  }

  const cleanFilters = () => {
    setFilters({})
    navigate('/shop')
  }

  return (
    <ShopContext.Provider 
    value={{filters,setFilters,handlePrice,cleanFilters}}>
      {children}
    </ShopContext.Provider>
  )
}
