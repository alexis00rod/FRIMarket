import { useState,useEffect } from 'react'
import { addBrand } from '../../services/firestore'

export const PostBrand = ({selected,category, ...props}) => {
  const [brandToAdd, setBrandToAdd] = useState('')
  const [searchBrand, setSearchBrand] = useState()
  const [dropDown, setDropDown] = useState(false)

  useEffect(() => {
    setDropDown(false)
  },[selected])

  const handleDropDown = e => {
    e.preventDefault()
    setDropDown(!dropDown)
  }

  const addNewBrand = e => {
    e.preventDefault()
    addBrand(category,brandToAdd)
    setBrandToAdd('')
  }

  const brands = searchBrand ? category.brands.filter(e => e.includes(searchBrand)) : category.brands

  return (
    <div className="px-2 py-2 flex flex-col">
      <span className="px-1 text-sm font-medium">Marca:</span>
      <div className="relative w-full max-w-xs h-8">
        <button className={`w-full h-full flex border border-gray-300 ${dropDown ? 'rounded-t-md' : 'rounded-md'}`} onClick={handleDropDown}>
          <span className='h-full px-2 flex items-center grow capitalize'>{selected}</span>
          <i className={`w-8 h-full flex items-center justify-center fa-solid fa-chevron-${dropDown ? 'up' : 'down'}`}></i>
        </button>
        {dropDown &&
        <div className='absolute top-full left-0 z-10 w-full h-max max-h-dropdown flex flex-col bg-white border-x border-b border-gray-300 rounded-b-md shadow-md overflow-hidden'>
          {/* Search brands */}
          <div className="w-full h-8 flex flex-none">
            <input 
            type="text" 
            name="searchBrand" 
            className='px-2 grow outline-none placeholder:text-sm' 
            placeholder='Buscar marca'
            value={searchBrand}
            onChange={({target:{value}}) => setSearchBrand(value)}
            />
          </div>
          {/* Brands */}
          <ul className="w-full flex flex-col grow overflow-y-scroll">
            {brands.map(e => (
              <li key={e} className='w-full h-8 flex-none' >
                <input type="radio" name="brand" id={e} className='hidden' {...props} />
                <label 
                htmlFor={e} 
                className='w-full h-full px-2 flex items-center text-sm capitalize hover:bg-gray-100 cursor-pointer'
                >
                  {e}
                </label>
              </li>
            ))}
          </ul>
          {/* Add brand */}
          <div className="w-full h-8 flex flex-none">
            <input 
            type="text" 
            name="" 
            id="" 
            className='px-2 grow outline-none placeholder:text-sm' 
            placeholder='Escribe nombre de la marca'
            value={brandToAdd}
            onChange={({target:{value}}) => setBrandToAdd(value)}
            />
            <button className='w-8 h-full hover:text-green-500' onClick={addNewBrand}>
              <i className="fa-solid fa-check"></i>
            </button>
          </div>
        </div>}
      </div>
    </div>
  )
}
