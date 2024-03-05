import { useState } from "react"
import { useShopContext } from "../context/ShopContext"

export const ShopPriceRange = () => {
  const {filters,setFilters} = useShopContext()
  const [price, setPrice] = useState({min:filters.min,max:filters.max})

  const filterPrice = e => {
    e.preventDefault()
    setFilters({
      ...filters,
      min: price.min ? parseFloat(price.min) : undefined,
      max: price.max ? parseFloat(price.max) : undefined
    })
  }

  return (
    <div className="shopFilter-price">
      <span className="text-sm">Escoge un rango</span>
      <div className="shopFilter-price-inputs">
        <input 
        type="number"
        name="minPrice"
        value={price?.min || ''}
        onChange={({target:{value}}) => setPrice({...price,min:value})}
        placeholder="min." 
        />
        <span>a</span>
        <input 
        type="number"
        name="maxPrice"
        value={price?.max || ''}
        onChange={({target:{value}}) => setPrice({...price,max:value})}
        placeholder="max." 
        />
        <button className="ml-4 btn btn-s btn-blue" onClick={filterPrice}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  )
}
