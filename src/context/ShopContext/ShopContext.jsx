import { useState, useEffect, useContext, createContext } from 'react'
import { getCategories } from '../../services/firestore'
import { getLocations } from '../../services/locations'

const ShopContext = createContext()
export const useShopContext = () => useContext(ShopContext)

export const ShopContextProvider = ({children}) => {
  const [categories, setCategories] = useState([])
  const [locations, setLocations] = useState([])
  const [filters, setFilters] = useState({
    type: 'allTypes',
    brand: 'allBrands',
    province: 'allProvinces',
    minPrice: 0,
    maxPrice: 9999999999,
  })

  useEffect(() => {
    getCategories(setCategories)
    getLocations()
    .then(resp => setLocations(resp))
  },[])

  const handleFilter = ({target: {name,value}}) => {
    setFilters({
      ...filters,
      [name]: value
    })
  }

  const handlePrice = ({target: {name,value}}) => {
    const price = name === 'minPrice'
      ? value === '' ? 0 : parseFloat(value)
      : value === '' ? 9999999999 : parseFloat(value)

    setFilters({
      ...filters,
      [name]: price
    })
  }

  return (
    <ShopContext.Provider 
    value={{categories,locations,filters,setFilters,handleFilter,handlePrice}}>
      {children}
    </ShopContext.Provider>
  )
}
