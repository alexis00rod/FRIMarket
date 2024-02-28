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
    <div className="flex flex-col gap-2">
      <span className="text-sm">Escoge un rango</span>
      <div className="flex items-center ">
        <input 
        type="number"
        name="minPrice"
        value={price?.min || ''}
        onChange={({target:{value}}) => setPrice({...price,min:value})}
        className="w-[100px] h-[35px] px-2 flex flex-none border border-gray-300 outline-none rounded-md"
        placeholder="min." 
        />
        <span className="w-[35px] h-[35px] flex items-center justify-center">a</span>
        <input 
        type="number"
        name="maxPrice"
        value={price?.max || ''}
        onChange={({target:{value}}) => setPrice({...price,max:value})}
        className="w-[100px] h-[35px] px-2 flex flex-none border border-gray-300 outline-none rounded-md"
        placeholder="max." 
        />
        <button className="ml-4 btn btn-s btn-blue" onClick={filterPrice}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  )
}
